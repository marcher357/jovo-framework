"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesizer = exports.SpeechSynthesizerEvent = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const TypedEventEmitter_1 = require("../utilities/TypedEventEmitter");
var SpeechSynthesizerEvent;
(function (SpeechSynthesizerEvent) {
    SpeechSynthesizerEvent["Speak"] = "speak";
    SpeechSynthesizerEvent["Pause"] = "pause";
    SpeechSynthesizerEvent["Resume"] = "resume";
    SpeechSynthesizerEvent["Stop"] = "stop";
    SpeechSynthesizerEvent["End"] = "end";
    SpeechSynthesizerEvent["Error"] = "error";
})(SpeechSynthesizerEvent = exports.SpeechSynthesizerEvent || (exports.SpeechSynthesizerEvent = {}));
class SpeechSynthesizer extends TypedEventEmitter_1.TypedEventEmitter {
    static getDefaultConfig() {
        return {
            enabled: true,
            language: 'en',
        };
    }
    constructor(config) {
        super();
        this.volume = 1.0;
        this.isSpeakingUtterance = false;
        const defaultConfig = SpeechSynthesizer.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
        this.synthesis = window.speechSynthesis || null;
    }
    get isAvailable() {
        return !!this.synthesis;
    }
    get isSpeaking() {
        return this.isSpeakingUtterance;
    }
    get canPause() {
        return !!this.synthesis && this.synthesis.speaking && !this.synthesis.paused;
    }
    get canResume() {
        return !!this.synthesis && this.synthesis.speaking && this.synthesis.paused;
    }
    get canStop() {
        return !!this.synthesis && this.synthesis.speaking;
    }
    resume() {
        if (!this.config.enabled || !this.canResume || !this.synthesis) {
            return;
        }
        this.synthesis.resume();
        this.emit(SpeechSynthesizerEvent.Resume);
    }
    pause() {
        if (!this.config.enabled || !this.canPause || !this.synthesis) {
            return;
        }
        this.synthesis.pause();
        this.emit(SpeechSynthesizerEvent.Pause);
    }
    stop() {
        if (!this.config.enabled || !this.canStop || !this.synthesis) {
            return;
        }
        this.synthesis.cancel();
        this.emit(SpeechSynthesizerEvent.Stop);
    }
    speak(utterance, forceVolume = true) {
        if (!this.config.enabled) {
            return Promise.resolve();
        }
        return new Promise(async (resolve, reject) => {
            if (!this.synthesis) {
                return;
            }
            utterance =
                typeof utterance === 'string' ? new SpeechSynthesisUtterance(utterance) : utterance;
            if (forceVolume) {
                utterance.volume = this.volume;
            }
            if (this.config.language) {
                utterance.lang = this.config.language;
            }
            if (this.config.voice) {
                utterance.voice = this.config.voice;
            }
            if (this.config.rate) {
                utterance.rate = this.config.rate;
            }
            utterance.onerror = (e) => {
                this.isSpeakingUtterance = false;
                this.emit(SpeechSynthesizerEvent.Error, e);
                return reject(e);
            };
            utterance.onpause = () => {
                this.isSpeakingUtterance = false;
                return resolve();
            };
            utterance.onend = () => {
                this.isSpeakingUtterance = false;
                this.emit(SpeechSynthesizerEvent.End);
                return resolve();
            };
            this.synthesis.speak(utterance);
            this.isSpeakingUtterance = true;
            this.emit(SpeechSynthesizerEvent.Speak, utterance);
        });
    }
}
exports.SpeechSynthesizer = SpeechSynthesizer;
//# sourceMappingURL=SpeechSynthesizer.js.map