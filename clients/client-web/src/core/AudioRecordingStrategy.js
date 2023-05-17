"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRecordingStrategy = void 0;
const common_1 = require("@jovotech/common");
const Client_1 = require("../Client");
const AudioRecorder_1 = require("../standalone/AudioRecorder");
const SpeechRecognizer_1 = require("../standalone/SpeechRecognizer");
const utilities_1 = require("../utilities");
const RecordingStrategy_1 = require("./RecordingStrategy");
class AudioRecordingStrategy extends RecordingStrategy_1.RecordingStrategy {
    constructor() {
        super(...arguments);
        this.type = RecordingStrategy_1.RecordingModalityType.Audio;
        this.onSpeechRecognizerEnd = async (event) => {
            this.onSpeechRecognizerFinished();
            if (!event) {
                return;
            }
            const text = utilities_1.AudioHelper.textFromSpeechRecognition(event);
            this.client.emit(Client_1.ClientEvent.Input, {
                type: common_1.InputType.TranscribedSpeech,
                text,
            });
        };
        this.onSpeechRecognizerFinished = () => {
            this.client.setRecordingModality(undefined);
            this.removeSpeechRecognizerEventListeners();
        };
        this.onAudioRecorderStop = async (result) => {
            this.onAudioRecorderFinished();
            this.client.emit(Client_1.ClientEvent.Input, {
                type: common_1.InputType.Speech,
                audio: {
                    sampleRate: result.sampleRate,
                    base64: utilities_1.Base64Converter.arrayBufferToBase64(result.data.buffer),
                },
            });
        };
        this.onAudioRecorderFinished = () => {
            this.client.setRecordingModality(undefined);
            this.removeAudioRecorderEventListeners();
        };
    }
    get modality() {
        var _a;
        return ((_a = this.client.currentRecordingModality) === null || _a === void 0 ? void 0 : _a.type) === RecordingStrategy_1.RecordingModalityType.Audio
            ? this.client.currentRecordingModality
            : undefined;
    }
    get useSpeechRecognition() {
        var _a, _b;
        return (_b = (_a = this.modality) === null || _a === void 0 ? void 0 : _a.useSpeechRecognition) !== null && _b !== void 0 ? _b : true;
    }
    async startRecording(modality) {
        if (modality.useSpeechRecognition === undefined) {
            modality.useSpeechRecognition = true;
        }
        if (modality.useSpeechRecognition && this.client.speechRecognizer.isAvailable) {
            this.addSpeechRecognizerEventListeners();
            this.client.speechRecognizer.start();
        }
        else {
            this.addAudioRecorderEventListeners();
            await this.client.audioRecorder.start();
        }
        return modality;
    }
    stopRecording() {
        if (this.useSpeechRecognition && this.client.speechRecognizer.isAvailable) {
            this.client.speechRecognizer.stop();
        }
        else {
            this.client.audioRecorder.stop();
        }
    }
    abortRecording() {
        if (this.useSpeechRecognition && this.client.speechRecognizer.isAvailable) {
            this.client.speechRecognizer.abort();
        }
        else {
            this.client.audioRecorder.abort();
        }
    }
    addAudioRecorderEventListeners() {
        this.client.audioRecorder.on(AudioRecorder_1.AudioRecorderEvent.Stop, this.onAudioRecorderStop);
        this.client.audioRecorder.on(AudioRecorder_1.AudioRecorderEvent.Abort, this.onAudioRecorderFinished);
        this.client.audioRecorder.on(AudioRecorder_1.AudioRecorderEvent.Timeout, this.onAudioRecorderFinished);
    }
    addSpeechRecognizerEventListeners() {
        this.client.speechRecognizer.on(SpeechRecognizer_1.SpeechRecognizerEvent.End, this.onSpeechRecognizerEnd);
        this.client.speechRecognizer.on(SpeechRecognizer_1.SpeechRecognizerEvent.Abort, this.onSpeechRecognizerFinished);
        this.client.speechRecognizer.on(SpeechRecognizer_1.SpeechRecognizerEvent.Timeout, this.onSpeechRecognizerFinished);
    }
    removeAudioRecorderEventListeners() {
        this.client.audioRecorder.off(AudioRecorder_1.AudioRecorderEvent.Stop, this.onAudioRecorderStop);
        this.client.audioRecorder.off(AudioRecorder_1.AudioRecorderEvent.Abort, this.onAudioRecorderFinished);
        this.client.audioRecorder.off(AudioRecorder_1.AudioRecorderEvent.Timeout, this.onAudioRecorderFinished);
    }
    removeSpeechRecognizerEventListeners() {
        this.client.speechRecognizer.off(SpeechRecognizer_1.SpeechRecognizerEvent.End, this.onSpeechRecognizerEnd);
        this.client.speechRecognizer.off(SpeechRecognizer_1.SpeechRecognizerEvent.Abort, this.onSpeechRecognizerFinished);
        this.client.speechRecognizer.off(SpeechRecognizer_1.SpeechRecognizerEvent.Timeout, this.onSpeechRecognizerFinished);
    }
}
exports.AudioRecordingStrategy = AudioRecordingStrategy;
//# sourceMappingURL=AudioRecordingStrategy.js.map