"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = exports.AudioPlayerEvent = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const __1 = require("..");
const NotInitializedError_1 = require("../errors/NotInitializedError");
const TypedEventEmitter_1 = require("../utilities/TypedEventEmitter");
var AudioPlayerEvent;
(function (AudioPlayerEvent) {
    AudioPlayerEvent["Play"] = "play";
    AudioPlayerEvent["Pause"] = "pause";
    AudioPlayerEvent["Resume"] = "resume";
    AudioPlayerEvent["Stop"] = "stop";
    AudioPlayerEvent["End"] = "end";
    AudioPlayerEvent["Error"] = "error";
})(AudioPlayerEvent = exports.AudioPlayerEvent || (exports.AudioPlayerEvent = {}));
class AudioPlayer extends TypedEventEmitter_1.TypedEventEmitter {
    static getDefaultConfig() {
        return {
            enabled: true,
        };
    }
    constructor(config) {
        super();
        this.audioVolume = 1.0;
        this.audio = null;
        this.isAudioPlaying = false;
        this.initialized = false;
        const defaultConfig = AudioPlayer.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
    }
    get isInitialized() {
        return this.initialized;
    }
    get isPlaying() {
        return this.isAudioPlaying;
    }
    get canResume() {
        return !!this.audio && !this.audio.ended && this.audio.paused;
    }
    get canPause() {
        return !!this.audio && !this.audio.ended && !this.audio.paused;
    }
    get canStop() {
        return !!this.audio && !this.audio.ended;
    }
    get volume() {
        return this.audioVolume;
    }
    set volume(value) {
        this.audioVolume = value;
        if (this.audio) {
            this.audio.volume = value;
        }
    }
    // Has to be called synchronously within an user-interaction handler (click, touch) in order to work on Safari
    initialize() {
        if (this.initialized) {
            return;
        }
        // Initialize audio with empty src in order for Safari to be able to use this audio asynchronously
        const audio = new Audio('');
        // Attempt to play audio and no matter what immediately pause afterwards (also required by Safari)
        audio
            .play()
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .then(() => { })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => { })
            .finally(() => {
            audio.pause();
        });
        this.audio = audio;
        this.initialized = true;
    }
    play(audioSource, contentType = 'audio/mpeg') {
        if (!this.config.enabled) {
            return Promise.resolve();
        }
        this.checkForInitialization();
        return new Promise(async (resolve, reject) => {
            if (!this.audio) {
                return reject(new NotInitializedError_1.NotInitializedError('AudioPlayer'));
            }
            if (!audioSource.startsWith('https://')) {
                const blob = await __1.Base64Converter.base64ToBlob(audioSource, contentType);
                audioSource = URL.createObjectURL(blob);
            }
            this.audio.onerror = (e) => {
                this.isAudioPlaying = false;
                this.emit(AudioPlayerEvent.Error, e);
                return reject(e);
            };
            this.audio.onpause = () => {
                this.isAudioPlaying = false;
                return resolve();
            };
            this.audio.onended = () => {
                this.isAudioPlaying = false;
                this.emit(AudioPlayerEvent.End);
                if (this.audio) {
                    this.audio.onerror = null;
                    this.audio.onpause = null;
                    this.audio.onended = null;
                }
                return resolve();
            };
            this.audio.src = audioSource;
            await this.audio.play();
            this.isAudioPlaying = true;
            this.emit(AudioPlayerEvent.Play, audioSource);
        });
    }
    resume() {
        if (!this.config.enabled) {
            return;
        }
        this.checkForInitialization();
        if (!this.canResume || !this.audio) {
            return;
        }
        this.audio.play().then(() => {
            this.isAudioPlaying = true;
            this.emit(AudioPlayerEvent.Resume);
        });
    }
    pause() {
        if (!this.config.enabled) {
            return;
        }
        this.checkForInitialization();
        if (!this.canPause || !this.audio) {
            return;
        }
        this.audio.pause();
        this.emit(AudioPlayerEvent.Pause);
    }
    stop() {
        if (!this.config.enabled) {
            return;
        }
        this.checkForInitialization();
        if (!this.canStop || !this.audio) {
            return;
        }
        this.audio.pause();
        this.audio.currentTime = 0;
        this.emit(AudioPlayerEvent.Stop);
    }
    checkForInitialization() {
        if (!this.initialized) {
            throw new NotInitializedError_1.NotInitializedError('AudioPlayer');
        }
    }
}
exports.AudioPlayer = AudioPlayer;
//# sourceMappingURL=AudioPlayer.js.map