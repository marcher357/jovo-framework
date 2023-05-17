"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepromptProcessor = void 0;
const __1 = require("..");
class RepromptProcessor {
    get config() {
        return this.client.config.output.reprompts;
    }
    static getDefaultConfig() {
        return {
            enabled: true,
            maxAttempts: 1,
            resetSessionOnRepromptLimit: false,
        };
    }
    constructor(client) {
        this.client = client;
        this.reprompts = [];
        this.attempts = 0;
        this.timeoutFn = this.onInputTimeout.bind(this);
        this.endFn = this.onInputEnd.bind(this);
    }
    get isUsingSpeechRecognition() {
        var _a;
        return (!!((_a = this.recordingModality) === null || _a === void 0 ? void 0 : _a.useSpeechRecognition) && this.client.speechRecognizer.isAvailable);
    }
    async processReprompts(reprompts, modality) {
        if (!this.config.enabled || !modality) {
            return;
        }
        this.attempts = 0;
        this.recordingModality = modality;
        this.reprompts = reprompts;
        return this.startRecording();
    }
    async onInputTimeout() {
        // end is immediately called after timeout, therefore the event listener for that event needs to be removed.
        // Additionally all other event listeners should be removed in order to not have issues if another input-class is used in the next reprompt
        this.removeInputEventListeners();
        if (this.attempts < this.config.maxAttempts) {
            return this.handleReprompts();
        }
        else {
            return this.handleRepromptLimitReached();
        }
    }
    onInputEnd() {
        // All other event listeners should be removed in order to not have issues if another input-class is used in the next reprompt
        this.removeInputEventListeners();
        this.reprompts = [];
    }
    async handleReprompts() {
        await this.client.outputProcessor.processSequence(this.reprompts.map((reprompt) => ({
            message: reprompt,
        })));
        await this.startRecording();
        this.attempts++;
    }
    handleRepromptLimitReached() {
        this.client.emit(__1.ClientEvent.RepromptLimitReached);
        return this.onInputEnd();
    }
    async startRecording() {
        if (!this.config.enabled || !this.recordingModality) {
            return;
        }
        this.addInputEventListeners();
        return this.client.startRecording(this.recordingModality);
    }
    addInputEventListeners() {
        if (this.isUsingSpeechRecognition) {
            this.client.speechRecognizer.once(__1.SpeechRecognizerEvent.Abort, this.endFn);
            this.client.speechRecognizer.once(__1.SpeechRecognizerEvent.Stop, this.endFn);
            this.client.speechRecognizer.once(__1.SpeechRecognizerEvent.Timeout, this.timeoutFn);
        }
        else {
            this.client.audioRecorder.once(__1.AudioRecorderEvent.Abort, this.endFn);
            this.client.audioRecorder.once(__1.AudioRecorderEvent.Stop, this.endFn);
            this.client.audioRecorder.once(__1.AudioRecorderEvent.Timeout, this.timeoutFn);
        }
    }
    removeInputEventListeners() {
        if (this.isUsingSpeechRecognition) {
            this.client.speechRecognizer.off(__1.SpeechRecognizerEvent.Abort, this.endFn);
            this.client.speechRecognizer.off(__1.SpeechRecognizerEvent.Stop, this.endFn);
            this.client.speechRecognizer.off(__1.SpeechRecognizerEvent.Timeout, this.timeoutFn);
        }
        else {
            this.client.audioRecorder.off(__1.AudioRecorderEvent.Abort, this.endFn);
            this.client.audioRecorder.off(__1.AudioRecorderEvent.Stop, this.endFn);
            this.client.audioRecorder.off(__1.AudioRecorderEvent.Timeout, this.timeoutFn);
        }
    }
}
exports.RepromptProcessor = RepromptProcessor;
//# sourceMappingURL=RepromptProcessor.js.map