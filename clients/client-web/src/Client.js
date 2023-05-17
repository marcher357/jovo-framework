"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.ClientEvent = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const uuid_1 = require("uuid");
const AudioRecordingStrategy_1 = require("./core/AudioRecordingStrategy");
const HttpTransportStrategy_1 = require("./core/HttpTransportStrategy");
const NetworkTransportStrategy_1 = require("./core/NetworkTransportStrategy");
const OutputProcessor_1 = require("./core/OutputProcessor");
const RecordingStrategy_1 = require("./core/RecordingStrategy");
const index_1 = require("./index");
const TypedEventEmitter_1 = require("./utilities/TypedEventEmitter");
var ClientEvent;
(function (ClientEvent) {
    ClientEvent["Request"] = "request";
    ClientEvent["Response"] = "response";
    ClientEvent["Input"] = "input";
    ClientEvent["Output"] = "output";
    ClientEvent["RepromptLimitReached"] = "reprompt-limit-reached";
})(ClientEvent = exports.ClientEvent || (exports.ClientEvent = {}));
class Client extends TypedEventEmitter_1.TypedEventEmitter {
    static getDefaultConfig() {
        return {
            version: '4.0',
            locale: 'en',
            platform: 'web',
            device: {
                id: (0, uuid_1.v4)(),
                capabilities: ['SCREEN', 'AUDIO'],
            },
            input: {
                audioRecorder: index_1.AudioRecorder.getDefaultConfig(),
                speechRecognizer: index_1.SpeechRecognizer.getDefaultConfig(),
            },
            output: {
                audioPlayer: index_1.AudioPlayer.getDefaultConfig(),
                speechSynthesizer: index_1.SpeechSynthesizer.getDefaultConfig(),
                reprompts: index_1.RepromptProcessor.getDefaultConfig(),
            },
            store: index_1.Store.getDefaultConfig(),
        };
    }
    constructor(endpointUrl, config) {
        super();
        this.endpointUrl = endpointUrl;
        this.initialized = false;
        this.networkTransportStrategy =
            (config === null || config === void 0 ? void 0 : config.networkTransportStrategy) instanceof NetworkTransportStrategy_1.NetworkTransportStrategy
                ? config.networkTransportStrategy
                : new HttpTransportStrategy_1.HttpTransportStrategy();
        const defaultConfig = Client.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
        this.recordingStrategies = [new AudioRecordingStrategy_1.AudioRecordingStrategy(this)];
        this.audioPlayer = new index_1.AudioPlayer(this.config.output.audioPlayer);
        this.audioRecorder = new index_1.AudioRecorder(this.config.input.audioRecorder);
        this.outputProcessor = new OutputProcessor_1.OutputProcessor(this);
        this.repromptProcessor = new index_1.RepromptProcessor(this);
        this.ssmlProcessor = new index_1.SSMLProcessor(this);
        this.speechRecognizer = new index_1.SpeechRecognizer(this.config.input.speechRecognizer);
        this.speechSynthesizer = new index_1.SpeechSynthesizer(this.config.output.speechSynthesizer);
        this.store = new index_1.Store(this.config.store);
        this.store.load();
        // TODO determine whether the block below should be handled by the library or by the consumer instead (might be bad for use-cases with sockets for example)
        this.on(ClientEvent.Request, () => {
            if (this.audioRecorder.isRecording) {
                this.audioRecorder.abort();
            }
            if (this.speechRecognizer.isRecording) {
                this.speechRecognizer.abort();
            }
            if (this.audioPlayer.isPlaying) {
                this.audioPlayer.stop();
            }
            if (this.speechSynthesizer.isSpeaking) {
                this.speechSynthesizer.stop();
            }
        });
        this.audioRecorder.on(index_1.AudioRecorderEvent.Start, () => {
            if (this.speechRecognizer.isRecording) {
                this.speechRecognizer.abort();
            }
            if (this.audioPlayer.isPlaying) {
                this.audioPlayer.stop();
            }
            if (this.speechSynthesizer.isSpeaking) {
                this.speechSynthesizer.stop();
            }
        });
        this.speechRecognizer.on(index_1.SpeechRecognizerEvent.Start, () => {
            if (this.audioRecorder.isRecording) {
                this.audioRecorder.abort();
            }
            if (this.audioPlayer.isPlaying) {
                this.audioPlayer.stop();
            }
            if (this.speechSynthesizer.isSpeaking) {
                this.speechSynthesizer.stop();
            }
        });
        this.on(ClientEvent.RepromptLimitReached, () => {
            // this.store.resetSession();
            // this.store.save();
        });
        this.on(ClientEvent.Input, async (input) => {
            await this.send(input);
        });
    }
    get isInitialized() {
        return this.initialized;
    }
    get isPlayingAudio() {
        return this.audioPlayer.isPlaying || this.speechSynthesizer.isSpeaking;
    }
    get isRecordingInput() {
        return this.audioRecorder.isRecording || this.speechRecognizer.isRecording;
    }
    /**
     * Should be called synchronously in a click-handler!
     */
    async initialize() {
        this.audioPlayer.initialize();
        this.audioRecorder.initialize();
        this.initialized = true;
    }
    async startRecording(modality = { type: RecordingStrategy_1.RecordingModalityType.Audio }) {
        if (this.currentRecordingModality) {
            return;
        }
        const relatedRecordingStrategy = this.getRelatedRecordingStrategy(modality.type);
        this.setRecordingModality(await (relatedRecordingStrategy === null || relatedRecordingStrategy === void 0 ? void 0 : relatedRecordingStrategy.startRecording(modality)));
    }
    stopRecording() {
        if (!this.currentRecordingModality) {
            return;
        }
        const relatedRecordingStrategy = this.getRelatedRecordingStrategy(this.currentRecordingModality.type);
        relatedRecordingStrategy === null || relatedRecordingStrategy === void 0 ? void 0 : relatedRecordingStrategy.stopRecording();
    }
    abortRecording() {
        if (!this.currentRecordingModality) {
            return;
        }
        const relatedRecordingStrategy = this.getRelatedRecordingStrategy(this.currentRecordingModality.type);
        relatedRecordingStrategy === null || relatedRecordingStrategy === void 0 ? void 0 : relatedRecordingStrategy.abortRecording();
    }
    createRequest(input) {
        return {
            version: this.config.version,
            platform: this.config.platform,
            id: (0, uuid_1.v4)(),
            timestamp: new Date().toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: this.config.locale,
            input,
            context: {
                device: this.config.device,
                session: this.store.sessionData,
                user: this.store.userData,
            },
        };
    }
    async send(inputOrRequest) {
        const request = 'version' in inputOrRequest && inputOrRequest.version
            ? inputOrRequest
            : this.createRequest(inputOrRequest);
        this.emit(ClientEvent.Request, request);
        const response = await this.networkTransportStrategy.send(this.endpointUrl, request);
        this.emit(ClientEvent.Response, response);
        await this.handleResponse(response);
        return response;
    }
    setRecordingModality(modality) {
        this.previousRecordingModality = this.currentRecordingModality;
        this.currentRecordingModality = modality;
    }
    async handleResponse(response) {
        var _a, _b;
        if (response.context.session.end) {
            this.store.resetSession();
        }
        else {
            this.store.sessionData.isNew = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.store.sessionData.state = response.context.session.state;
            this.store.sessionData.data = response.context.session.data;
            this.store.sessionData.updatedAt = new Date();
        }
        if ((_a = response.context.user) === null || _a === void 0 ? void 0 : _a.data) {
            this.store.userData.data = response.context.user.data;
        }
        this.store.save();
        if ((_b = response.output) === null || _b === void 0 ? void 0 : _b.length) {
            await this.outputProcessor.processSequence(response.output);
        }
    }
    getRelatedRecordingStrategy(type) {
        return this.recordingStrategies.find((recordingStrategy) => recordingStrategy.type === type);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map