"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechRecognizer = exports.SpeechRecognizerEvent = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const __1 = require("..");
const TypedEventEmitter_1 = require("../utilities/TypedEventEmitter");
var SpeechRecognizerEvent;
(function (SpeechRecognizerEvent) {
    SpeechRecognizerEvent["Start"] = "start";
    SpeechRecognizerEvent["Stop"] = "stop";
    SpeechRecognizerEvent["Abort"] = "abort";
    SpeechRecognizerEvent["StartDetected"] = "start-detected";
    SpeechRecognizerEvent["SpeechRecognized"] = "speech-recognized";
    SpeechRecognizerEvent["SilenceDetected"] = "silence-detected";
    SpeechRecognizerEvent["Timeout"] = "timeout";
    SpeechRecognizerEvent["Error"] = "error";
    SpeechRecognizerEvent["End"] = "end";
})(SpeechRecognizerEvent = exports.SpeechRecognizerEvent || (exports.SpeechRecognizerEvent = {}));
class SpeechRecognizer extends TypedEventEmitter_1.TypedEventEmitter {
    static isSupported() {
        return (!!(window.SpeechRecognition || window.webkitSpeechRecognition) && __1.BrowserDetector.isChrome());
    }
    static getDefaultConfig() {
        window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
        return {
            lang: 'en',
            continuous: true,
            interimResults: true,
            maxAlternatives: 1,
            grammars: window.SpeechGrammarList ? new window.SpeechGrammarList() : null,
            silenceDetection: {
                enabled: true,
                timeoutInMs: 1500,
            },
            startDetection: {
                enabled: true,
                timeoutInMs: 3000,
            },
        };
    }
    constructor(config) {
        super();
        this.recognition = null;
        this.recording = false;
        this.lastRecognitionEvent = null;
        this.ignoreNextEnd = false;
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const defaultConfig = SpeechRecognizer.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
        if (SpeechRecognizer.isSupported()) {
            this.recognition = new window.SpeechRecognition();
            this.setupSpeechRecognition(this.recognition);
        }
    }
    get isRecording() {
        return this.recording;
    }
    get isAvailable() {
        return !!this.recognition;
    }
    get startDetectionEnabled() {
        return !!(this.config.continuous &&
            this.config.interimResults &&
            this.config.startDetection.enabled &&
            this.config.startDetection.timeoutInMs);
    }
    get silenceDetectionEnabled() {
        return !!(this.config.continuous &&
            this.config.interimResults &&
            this.config.silenceDetection.enabled &&
            this.config.silenceDetection.timeoutInMs);
    }
    start() {
        if (this.recording || !this.recognition) {
            return;
        }
        this.lastRecognitionEvent = null;
        this.recognition.start();
        this.recording = true;
        this.emit(SpeechRecognizerEvent.Start);
    }
    stop() {
        if (!this.recording || !this.recognition) {
            return;
        }
        this.emit(SpeechRecognizerEvent.Stop);
        this.recognition.stop();
    }
    abort() {
        if (!this.recording || !this.recognition) {
            return;
        }
        this.emit(SpeechRecognizerEvent.Abort);
        this.ignoreNextEnd = true;
        this.recognition.abort();
    }
    setupSpeechRecognition(recognition) {
        recognition.lang = this.config.lang;
        recognition.continuous = this.config.continuous;
        recognition.interimResults = this.config.interimResults;
        recognition.maxAlternatives = this.config.maxAlternatives;
        recognition.onaudiostart = () => {
            if (this.startDetectionEnabled) {
                this.scheduleStartDetectionTimeout();
            }
        };
        recognition.onspeechstart = () => {
            if (this.startDetectionEnabled && this.timeoutId) {
                this.emit(SpeechRecognizerEvent.StartDetected);
                clearTimeout(this.timeoutId);
            }
            if (this.silenceDetectionEnabled) {
                this.scheduleSilenceDetectionTimeout();
            }
        };
        recognition.onresult = (event) => {
            this.lastRecognitionEvent = event;
            if (this.silenceDetectionEnabled) {
                this.scheduleSilenceDetectionTimeout();
            }
            this.emit(SpeechRecognizerEvent.SpeechRecognized, event);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (err) => {
            if (err.error === 'aborted') {
                return;
            }
            this.emit(SpeechRecognizerEvent.Error, err);
        };
        recognition.onend = () => {
            this.recording = false;
            this.clearTimeout();
            if (this.ignoreNextEnd) {
                this.ignoreNextEnd = false;
                return;
            }
            this.emit(SpeechRecognizerEvent.End, this.lastRecognitionEvent);
        };
    }
    scheduleStartDetectionTimeout() {
        this.clearTimeout();
        this.timeoutId = setTimeout(() => {
            if (this.startDetectionEnabled) {
                this.emit(SpeechRecognizerEvent.Timeout);
                this.abort();
            }
        }, this.config.silenceDetection.timeoutInMs);
    }
    scheduleSilenceDetectionTimeout() {
        this.clearTimeout();
        this.timeoutId = setTimeout(() => {
            if (this.silenceDetectionEnabled) {
                this.emit(SpeechRecognizerEvent.SilenceDetected);
                if (this.lastRecognitionEvent) {
                    this.stop();
                }
                else {
                    this.emit(SpeechRecognizerEvent.Timeout);
                    this.abort();
                }
            }
        }, this.config.silenceDetection.timeoutInMs);
    }
    clearTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}
exports.SpeechRecognizer = SpeechRecognizer;
//# sourceMappingURL=SpeechRecognizer.js.map