"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayerComponent = void 0;
const framework_1 = require("@jovotech/framework");
const platform_alexa_1 = require("@jovotech/platform-alexa");
let AudioPlayerComponent = class AudioPlayerComponent extends framework_1.BaseComponent {
    START() {
        return this.$send(platform_alexa_1.AudioPlayerPlayOutput, {
            message: 'Starting audio',
            audioItem: {
                stream: {
                    url: 'https://s3.amazonaws.com/jovo-songs/song1.mp3',
                },
            },
        });
    }
    playbackStarted() {
        // @see https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html#playbackstopped
        console.log('AudioPlayer.PlaybackStarted');
        // this.$send is not necessary here, an empty response will be returned
    }
    playbackNearlyFinished() {
        // @see https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html#playbacknearlyfinished
        console.log('AudioPlayer.PlaybackNearlyFinished');
        // this.$send is not necessary here, an empty response will be returned
    }
    playbackFailed() {
        // @see https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html#playbackfailed
        const error = this.$alexa.audioPlayer.error;
        console.log('AudioPlayer.PlaybackFailed', error === null || error === void 0 ? void 0 : error.type, error === null || error === void 0 ? void 0 : error.message);
        // this.$send is not necessary here, an empty response will be returned
    }
    playbackStopped() {
        var _a;
        // @see https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html#playbackstopped
        this.$user.data.audioPlayerOffset = (_a = this.$alexa.audioPlayer) === null || _a === void 0 ? void 0 : _a.offsetInMilliseconds;
        console.log('Saved audioPlayerOffset:', this.$user.data.audioPlayerOffset + ' ms');
        console.log('AudioPlayer.PlaybackStopped');
        // this.$send is not necessary here, an empty response will be returned
    }
    playbackFinished() {
        // @see https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html#playbackfinished
        console.log('AudioPlayer.PlaybackFinished');
        // this.$send is not necessary here, an empty response will be returned
    }
    clearQueue() { }
    resumeAudio() {
        return this.$send(platform_alexa_1.AudioPlayerPlayOutput, {
            message: 'Continuing audio',
            audioItem: {
                stream: {
                    url: 'https://s3.amazonaws.com/jovo-songs/song1.mp3',
                    token: 'song1',
                    offsetInMilliseconds: this.$user.data.audioPlayerOffset,
                },
            },
        });
    }
    END() {
        return this.$send(platform_alexa_1.AudioPlayerStopOutput);
    }
};
__decorate([
    (0, framework_1.Handle)(platform_alexa_1.AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStarted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "playbackStarted", null);
__decorate([
    (0, framework_1.Handle)(platform_alexa_1.AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackNearlyFinished')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "playbackNearlyFinished", null);
__decorate([
    (0, framework_1.Handle)(platform_alexa_1.AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFailed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "playbackFailed", null);
__decorate([
    (0, framework_1.Handle)(platform_alexa_1.AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStopped')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "playbackStopped", null);
__decorate([
    (0, framework_1.Handle)(platform_alexa_1.AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFinished')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "playbackFinished", null);
__decorate([
    (0, framework_1.Intents)(['ClearQueueIntent']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "clearQueue", null);
__decorate([
    (0, framework_1.Intents)(['AMAZON.ResumeIntent']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "resumeAudio", null);
__decorate([
    (0, framework_1.Intents)(['AMAZON.PauseIntent']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AudioPlayerComponent.prototype, "END", null);
AudioPlayerComponent = __decorate([
    (0, framework_1.Global)(),
    (0, framework_1.Component)()
], AudioPlayerComponent);
exports.AudioPlayerComponent = AudioPlayerComponent;
//# sourceMappingURL=AudioPlayerComponent.js.map