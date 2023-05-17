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
exports.Suggestion = void 0;
const output_1 = require("@jovotech/output");
const IsValidSuggestionObject_1 = require("../decorators/validation/IsValidSuggestionObject");
const AuthenticationRequest_1 = require("./suggestion/AuthenticationRequest");
const LiveAgentRequest_1 = require("./suggestion/LiveAgentRequest");
const SuggestedAction_1 = require("./suggestion/SuggestedAction");
const SuggestedReply_1 = require("./suggestion/SuggestedReply");
class Suggestion {
    toQuickReply() {
        var _a, _b, _c, _d;
        return {
            text: ((_a = this.reply) === null || _a === void 0 ? void 0 : _a.text) || ((_b = this.action) === null || _b === void 0 ? void 0 : _b.text) || '',
            value: ((_c = this.reply) === null || _c === void 0 ? void 0 : _c.postbackData) || ((_d = this.action) === null || _d === void 0 ? void 0 : _d.postbackData),
        };
    }
}
__decorate([
    (0, IsValidSuggestionObject_1.IsValidSuggestionObject)(),
    (0, output_1.Type)(() => SuggestedReply_1.SuggestedReply),
    __metadata("design:type", SuggestedReply_1.SuggestedReply)
], Suggestion.prototype, "reply", void 0);
__decorate([
    (0, IsValidSuggestionObject_1.IsValidSuggestionObject)(),
    (0, output_1.Type)(() => SuggestedAction_1.SuggestedAction),
    __metadata("design:type", SuggestedAction_1.SuggestedAction)
], Suggestion.prototype, "action", void 0);
__decorate([
    (0, IsValidSuggestionObject_1.IsValidSuggestionObject)(),
    (0, output_1.Type)(() => LiveAgentRequest_1.LiveAgentRequest),
    __metadata("design:type", LiveAgentRequest_1.LiveAgentRequest)
], Suggestion.prototype, "liveAgentRequest", void 0);
__decorate([
    (0, IsValidSuggestionObject_1.IsValidSuggestionObject)(),
    (0, output_1.Type)(() => AuthenticationRequest_1.AuthenticationRequest),
    __metadata("design:type", AuthenticationRequest_1.AuthenticationRequest)
], Suggestion.prototype, "authenticationRequest", void 0);
exports.Suggestion = Suggestion;
//# sourceMappingURL=Suggestion.js.map