"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedAudioInput = void 0;
const AudioUtilities_1 = require("./AudioUtilities");
class ParsedAudioInput {
    static fromAudioInput(audio) {
        const samples = AudioUtilities_1.AudioUtilities.getSamplesFromBase64(audio.base64);
        return new ParsedAudioInput(samples, audio.sampleRate);
    }
    constructor(samples, sampleRate) {
        this.samples = samples;
        this.sampleRate = sampleRate;
    }
    sampleDown(targetSampleRate) {
        this.samples = AudioUtilities_1.AudioUtilities.sampleDown(this.samples, this.sampleRate, targetSampleRate);
        this.sampleRate = targetSampleRate;
        return this;
    }
    toWav(targetSampleRate) {
        const samples = targetSampleRate
            ? AudioUtilities_1.AudioUtilities.sampleDown(this.samples, this.sampleRate, targetSampleRate)
            : this.samples;
        return AudioUtilities_1.AudioUtilities.encodeSamplesToWav(samples, targetSampleRate || this.sampleRate);
    }
}
exports.ParsedAudioInput = ParsedAudioInput;
//# sourceMappingURL=ParsedAudioInput.js.map