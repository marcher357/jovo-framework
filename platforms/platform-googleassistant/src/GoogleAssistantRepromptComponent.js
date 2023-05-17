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
exports.GoogleAssistantRepromptComponent = void 0;
const framework_1 = require("@jovotech/framework");
const enums_1 = require("./enums");
let GoogleAssistantRepromptComponent = class GoogleAssistantRepromptComponent extends framework_1.BaseComponent {
    async googleAssistantNoInput() {
        var _a, _b, _c;
        // could be improved to only the the string that is related to the current intent
        const prompt = ((_a = this.$session._GOOGLE_ASSISTANT_REPROMPTS_) === null || _a === void 0 ? void 0 : _a.NO_INPUT_1) ||
            ((_b = this.$session._GOOGLE_ASSISTANT_REPROMPTS_) === null || _b === void 0 ? void 0 : _b.NO_INPUT_2) ||
            ((_c = this.$session._GOOGLE_ASSISTANT_REPROMPTS_) === null || _c === void 0 ? void 0 : _c.NO_INPUT_FINAL);
        if (prompt) {
            await this.$send({
                message: prompt,
            });
            // only delete reprompts on final reprompt
            if (this.$input.getIntentName() === enums_1.GoogleAssistantSystemIntent.NoInputFinal) {
                delete this.$session._GOOGLE_ASSISTANT_REPROMPTS_;
            }
        }
    }
};
__decorate([
    (0, framework_1.Intents)(enums_1.GoogleAssistantSystemIntent.NoInput1, enums_1.GoogleAssistantSystemIntent.NoInput2, enums_1.GoogleAssistantSystemIntent.NoInputFinal),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAssistantRepromptComponent.prototype, "googleAssistantNoInput", null);
GoogleAssistantRepromptComponent = __decorate([
    (0, framework_1.Global)()
], GoogleAssistantRepromptComponent);
exports.GoogleAssistantRepromptComponent = GoogleAssistantRepromptComponent;
//# sourceMappingURL=GoogleAssistantRepromptComponent.js.map