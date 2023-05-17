"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AudioPlayerPlayOutput_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayerPlayOutput = void 0;
const framework_1 = require("@jovotech/framework");
const models_1 = require("../models");
let AudioPlayerPlayOutput = AudioPlayerPlayOutput_1 = class AudioPlayerPlayOutput extends framework_1.BaseOutput {
    getDefaultOptions() {
        return {
            playBehavior: models_1.PlayBehavior.ReplaceAll,
            audioItem: {
                stream: {
                    url: '',
                    token: '',
                    offsetInMilliseconds: 0,
                },
            },
        };
    }
    build() {
        // Sets the file name as token, if it's not set in options by the developer.
        // https://example.com/fileXYZ.mp3 => token = fileXYZ.mp3
        this.options.audioItem.stream.token =
            this.options.audioItem.stream.token ||
                AudioPlayerPlayOutput_1.getTokenFromUrl(this.options.audioItem.stream.url);
        return {
            message: this.options.message,
            platforms: {
                alexa: {
                    nativeResponse: {
                        response: {
                            shouldEndSession: true,
                            directives: [
                                {
                                    type: 'AudioPlayer.Play',
                                    playBehavior: this.options.playBehavior,
                                    audioItem: this.options.audioItem,
                                },
                            ],
                        },
                    },
                },
            },
        };
    }
    static getTokenFromUrl(url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }
};
AudioPlayerPlayOutput = AudioPlayerPlayOutput_1 = __decorate([
    (0, framework_1.Output)()
], AudioPlayerPlayOutput);
exports.AudioPlayerPlayOutput = AudioPlayerPlayOutput;
//# sourceMappingURL=AudioPlayerPlayOutput.js.map