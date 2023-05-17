"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPrintImageOutput = exports.ImageType = void 0;
const framework_1 = require("@jovotech/framework");
const OnCompletion_1 = require("../models/common/OnCompletion");
var ImageType;
(function (ImageType) {
    ImageType["Jpg"] = "JPG";
    ImageType["Jpeg"] = "JPEG";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
let ConnectionPrintImageOutput = class ConnectionPrintImageOutput extends framework_1.BaseOutput {
    getDefaultOptions() {
        return {
            onCompletion: OnCompletion_1.OnCompletion.ResumeSession,
            title: '',
            url: '',
            imageType: ImageType.Jpg,
        };
    }
    build() {
        const shouldEndSession = this.options.onCompletion === OnCompletion_1.OnCompletion.SendErrorsOnly
            ? true
            : this.options.shouldEndSession;
        return {
            message: this.options.message,
            platforms: {
                alexa: {
                    nativeResponse: {
                        response: {
                            shouldEndSession,
                            directives: [
                                {
                                    type: 'Connections.StartConnection',
                                    uri: 'connection://AMAZON.PrintImage/1',
                                    input: {
                                        '@type': 'PrintImageRequest',
                                        '@version': '1',
                                        'title': this.options.title,
                                        'description': this.options.description,
                                        'url': this.options.url,
                                        'imageType': this.options.imageType,
                                    },
                                    token: this.options.token,
                                    onCompletion: this.options.onCompletion,
                                },
                            ],
                        },
                    },
                },
            },
        };
    }
};
ConnectionPrintImageOutput = __decorate([
    (0, framework_1.Output)()
], ConnectionPrintImageOutput);
exports.ConnectionPrintImageOutput = ConnectionPrintImageOutput;
//# sourceMappingURL=ConnectionPrintImageOutput.js.map