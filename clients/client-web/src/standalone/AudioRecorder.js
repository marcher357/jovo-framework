"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRecorder = exports.AudioRecorderEvent = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const __1 = require("..");
const TypedEventEmitter_1 = require("../utilities/TypedEventEmitter");
var AudioRecorderEvent;
(function (AudioRecorderEvent) {
    AudioRecorderEvent["Start"] = "start";
    AudioRecorderEvent["Processing"] = "processing";
    AudioRecorderEvent["StartDetected"] = "start-detected";
    AudioRecorderEvent["SilenceDetected"] = "silenced-detected";
    AudioRecorderEvent["Timeout"] = "timeout";
    AudioRecorderEvent["Abort"] = "abort";
    AudioRecorderEvent["Stop"] = "stop";
})(AudioRecorderEvent = exports.AudioRecorderEvent || (exports.AudioRecorderEvent = {}));
class AudioRecorder extends TypedEventEmitter_1.TypedEventEmitter {
    static getDefaultConfig() {
        return {
            sampleRate: 16000,
            audioConstraints: {
                echoCancellation: true,
                noiseSuppression: true,
            },
            analyser: {
                bufferSize: 2048,
                maxDecibels: -10,
                minDecibels: -90,
                smoothingTimeConstant: 0.85,
            },
            startDetection: {
                enabled: true,
                timeoutInMs: 3000,
                threshold: 0.2,
            },
            silenceDetection: {
                enabled: true,
                timeoutInMs: 1500,
                threshold: 0.2,
            },
        };
    }
    constructor(config) {
        super();
        this.audioNodes = {};
        this.audioContext = null;
        this.mediaStream = null;
        this.initialized = false;
        this.recording = false;
        this.startThresholdPassed = false;
        this.chunks = [];
        this.chunkLength = 0;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const defaultConfig = AudioRecorder.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
    }
    get isInitialized() {
        return this.initialized;
    }
    get isRecording() {
        return this.recording;
    }
    get startDetectionEnabled() {
        return !!(this.config.startDetection.enabled &&
            this.config.startDetection.threshold &&
            this.config.startDetection.timeoutInMs);
    }
    get silenceDetectionEnabled() {
        return !!(this.config.silenceDetection.enabled &&
            this.config.silenceDetection.threshold &&
            this.config.silenceDetection.timeoutInMs);
    }
    /**
     * Initialize the AudioRecorder. This needs to be called synchronously in a click-event handler for Safari in order to properly work.
     */
    initialize() {
        if (this.initialized) {
            return;
        }
        this.checkForBrowserCompatibility();
        const ctx = new AudioContext();
        this.audioNodes.inputGain = ctx.createGain();
        const analyser = ctx.createAnalyser();
        analyser.minDecibels = this.config.analyser.minDecibels;
        analyser.maxDecibels = this.config.analyser.maxDecibels;
        analyser.smoothingTimeConstant = this.config.analyser.smoothingTimeConstant;
        this.audioNodes.analyser = analyser;
        this.audioNodes.processor = ctx.createScriptProcessor();
        this.audioNodes.processor.onaudioprocess = this.doProcessing.bind(this);
        this.audioNodes.destination = ctx.destination;
        this.audioContext = ctx;
        this.initialized = true;
    }
    async start() {
        this.checkForInitialization();
        if (this.recording) {
            return;
        }
        this.checkForBrowserCompatibility();
        if (__1.OperatingSystemDetector.isWindows()) {
            if (!this.mediaStream) {
                this.mediaStream = await this.getUserMediaStream();
            }
            return this.startRecording(this.mediaStream);
        }
        const stream = await this.getUserMediaStream();
        return this.startRecording(stream);
    }
    stop() {
        this.checkForInitialization();
        if (!this.recording) {
            return;
        }
        this.stopRecording();
        const data = this.mergeChunks(this.chunks, this.chunkLength);
        const result = {
            data,
            sampleRate: this.config.sampleRate,
        };
        this.emit(AudioRecorderEvent.Stop, result);
    }
    abort() {
        this.checkForInitialization();
        if (!this.recording) {
            return;
        }
        this.stopRecording();
        this.emit(AudioRecorderEvent.Abort);
    }
    startRecording(stream) {
        if (!this.audioContext) {
            throw new __1.NotInitializedError('AudioRecorder');
        }
        this.chunks = [];
        this.chunkLength = 0;
        this.startThresholdPassed = false;
        this.mediaStream = stream;
        const nodes = this.audioNodes;
        nodes.inputStream = this.audioContext.createMediaStreamSource(stream);
        this.audioContext = nodes.inputStream.context;
        this.config.sampleRate = this.audioContext.sampleRate;
        nodes.inputStream.connect(nodes.inputGain);
        nodes.inputGain.gain.setValueAtTime(1.0, this.audioContext.currentTime);
        nodes.inputGain.connect(nodes.analyser);
        nodes.inputGain.connect(nodes.processor);
        nodes.processor.connect(nodes.destination);
        this.recordingStartedAt = new Date();
        this.recording = true;
        if (this.startDetectionEnabled) {
            this.initializeStartDetection();
        }
        this.emit(AudioRecorderEvent.Start);
    }
    initializeStartDetection() {
        setTimeout(() => {
            if (!this.startThresholdPassed && this.startDetectionEnabled) {
                this.onTimeout();
            }
        }, this.config.startDetection.timeoutInMs);
    }
    stopRecording() {
        var _a, _b, _c, _d;
        (_a = this.audioNodes.processor) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.audioNodes.analyser) === null || _b === void 0 ? void 0 : _b.disconnect();
        (_c = this.audioNodes.inputGain) === null || _c === void 0 ? void 0 : _c.disconnect();
        (_d = this.audioNodes.inputStream) === null || _d === void 0 ? void 0 : _d.disconnect();
        if (this.mediaStream && !__1.OperatingSystemDetector.isWindows) {
            this.mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
            this.mediaStream = null;
        }
        this.recording = false;
    }
    onTimeout() {
        if (!this.recording) {
            return;
        }
        this.stopRecording();
        this.emit(AudioRecorderEvent.Timeout);
    }
    doProcessing(evt) {
        if (!this.recording) {
            return;
        }
        this.chunks.push(new Float32Array(evt.inputBuffer.getChannelData(0)));
        this.chunkLength += this.audioNodes.processor.bufferSize;
        const analyser = this.audioNodes.analyser;
        analyser.fftSize = this.audioNodes.processor.bufferSize;
        const bufferLength = analyser.frequencyBinCount;
        const data = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(data);
        const eventData = {
            bufferLength,
            data,
        };
        this.emit(AudioRecorderEvent.Processing, eventData);
        if (this.startDetectionEnabled && !this.startThresholdPassed) {
            return this.detectStart(bufferLength, data);
        }
        if (this.silenceDetectionEnabled && this.startThresholdPassed) {
            return this.detectSilence(bufferLength, data);
        }
    }
    detectStart(bufferLength, data) {
        for (let i = 0; i < bufferLength; i++) {
            const current = data[i] / 128 - 1.0;
            if (this.startThresholdPassed) {
                return;
            }
            if (current >= this.config.startDetection.threshold ||
                current <= -1 * this.config.startDetection.threshold) {
                this.startThresholdPassed = true;
                this.emit(AudioRecorderEvent.StartDetected);
                return;
            }
        }
    }
    detectSilence(bufferLength, data) {
        var _a;
        for (let i = 0; i < bufferLength; i++) {
            // normalize
            const current = data[i] / 128 - 1.0;
            if (current > this.config.silenceDetection.threshold ||
                current < -1 * this.config.silenceDetection.threshold) {
                this.recordingStartedAt = new Date();
            }
        }
        const newTime = new Date();
        const elapsedTime = newTime.getTime() - (((_a = this.recordingStartedAt) === null || _a === void 0 ? void 0 : _a.getTime()) || newTime.getTime());
        if (elapsedTime > this.config.silenceDetection.timeoutInMs) {
            this.emit(AudioRecorderEvent.SilenceDetected);
            this.stop();
        }
    }
    mergeChunks(chunks, chunkLength) {
        const merged = new Float32Array(chunkLength);
        let offset = 0;
        for (const chunk of chunks) {
            merged.set(chunk, offset);
            offset += chunk.length;
        }
        return merged;
    }
    checkForInitialization() {
        if (!this.initialized) {
            throw new __1.NotInitializedError('AudioRecorder');
        }
    }
    checkForBrowserCompatibility() {
        // if (location.hostname !== 'localhost' && location.protocol !== 'https:') {
        //   throw new Error('Recording is only allowed on https-sites except for localhost.');
        // }
        if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('`navigator.mediaDevices.getUserMedia` is not available - recording is not supported');
        }
    }
    getUserMediaStream() {
        return navigator.mediaDevices.getUserMedia({
            audio: this.config.audioConstraints,
        });
    }
}
exports.AudioRecorder = AudioRecorder;
//# sourceMappingURL=AudioRecorder.js.map