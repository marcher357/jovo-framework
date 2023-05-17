"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionTestStatusCodeOutput = void 0;
const framework_1 = require("@jovotech/framework");
const OnCompletion_1 = require("../models/common/OnCompletion");
let ConnectionTestStatusCodeOutput = class ConnectionTestStatusCodeOutput extends framework_1.BaseOutput {
    getDefaultOptions() {
        return {
            onCompletion: OnCompletion_1.OnCompletion.ResumeSession,
            code: '404',
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
                                    uri: 'connection://AMAZON.TestStatusCode/1',
                                    input: {
                                        code: this.options.code,
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
ConnectionTestStatusCodeOutput = __decorate([
    (0, framework_1.Output)()
], ConnectionTestStatusCodeOutput);
exports.ConnectionTestStatusCodeOutput = ConnectionTestStatusCodeOutput;
//# sourceMappingURL=ConnectionTestStatusCodeOutput.js.map