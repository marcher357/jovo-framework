"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextSceneOutput = void 0;
const framework_1 = require("@jovotech/framework");
let NextSceneOutput = class NextSceneOutput extends framework_1.BaseOutput {
    build() {
        var _a, _b;
        return {
            message: this.options.message,
            platforms: {
                googleAssistant: {
                    nativeResponse: {
                        scene: {
                            name: (_b = (_a = this.jovo.$googleAssistant) === null || _a === void 0 ? void 0 : _a.$request.scene) === null || _b === void 0 ? void 0 : _b.name,
                            slots: this.options.slots || {},
                            next: {
                                name: this.options.name,
                            },
                        },
                    },
                },
            },
        };
    }
};
NextSceneOutput = __decorate([
    (0, framework_1.Output)()
], NextSceneOutput);
exports.NextSceneOutput = NextSceneOutput;
//# sourceMappingURL=NextSceneOutput.js.map