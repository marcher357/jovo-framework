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
exports.RbmSuggestedActionShareLocation = exports.RbmSuggestedActionOpenUri = exports.RbmSuggestedActionDial = exports.RbmSuggestedActionContent = exports.RbmSuggestedAction = exports.RbmSuggestedReply = exports.RbmSuggestionContent = exports.RbmSuggestion = void 0;
const output_1 = require("@jovotech/output");
const IsValidRbmSuggestedActionContentObject_1 = require("../../../decorators/validation/IsValidRbmSuggestedActionContentObject");
const IsValidRbmSuggestionContentObject_1 = require("../../../decorators/validation/IsValidRbmSuggestionContentObject");
class RbmSuggestion {
}
__decorate([
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => RbmSuggestionContent),
    __metadata("design:type", RbmSuggestionContent)
], RbmSuggestion.prototype, "suggestion", void 0);
exports.RbmSuggestion = RbmSuggestion;
class RbmSuggestionContent {
}
__decorate([
    (0, IsValidRbmSuggestionContentObject_1.IsValidRbmSuggestionContentObject)(),
    (0, output_1.Type)(() => RbmSuggestedReply),
    __metadata("design:type", RbmSuggestedReply)
], RbmSuggestionContent.prototype, "reply", void 0);
__decorate([
    (0, IsValidRbmSuggestionContentObject_1.IsValidRbmSuggestionContentObject)(),
    (0, output_1.Type)(() => RbmSuggestedAction),
    __metadata("design:type", RbmSuggestedAction)
], RbmSuggestionContent.prototype, "action", void 0);
exports.RbmSuggestionContent = RbmSuggestionContent;
class RbmSuggestedReply {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RbmSuggestedReply.prototype, "text", void 0);
__decorate([
    (0, output_1.IsString)(),
    __metadata("design:type", String)
], RbmSuggestedReply.prototype, "postback_data", void 0);
exports.RbmSuggestedReply = RbmSuggestedReply;
class RbmSuggestedAction extends RbmSuggestedReply {
}
__decorate([
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => RbmSuggestedActionContent),
    __metadata("design:type", RbmSuggestedActionContent)
], RbmSuggestedAction.prototype, "action", void 0);
exports.RbmSuggestedAction = RbmSuggestedAction;
class RbmSuggestedActionContent {
}
__decorate([
    (0, IsValidRbmSuggestedActionContentObject_1.IsValidRbmSuggestedActionContentObject)(),
    (0, output_1.Type)(() => RbmSuggestedActionDial),
    __metadata("design:type", RbmSuggestedActionDial)
], RbmSuggestedActionContent.prototype, "dial", void 0);
__decorate([
    (0, IsValidRbmSuggestedActionContentObject_1.IsValidRbmSuggestedActionContentObject)(),
    (0, output_1.Type)(() => RbmSuggestedActionOpenUri),
    __metadata("design:type", RbmSuggestedActionOpenUri)
], RbmSuggestedActionContent.prototype, "open_url", void 0);
__decorate([
    (0, IsValidRbmSuggestedActionContentObject_1.IsValidRbmSuggestedActionContentObject)(),
    (0, output_1.Type)(() => RbmSuggestedActionShareLocation),
    __metadata("design:type", RbmSuggestedActionShareLocation)
], RbmSuggestedActionContent.prototype, "share_location", void 0);
exports.RbmSuggestedActionContent = RbmSuggestedActionContent;
class RbmSuggestedActionDial {
}
__decorate([
    (0, output_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], RbmSuggestedActionDial.prototype, "phone_number", void 0);
exports.RbmSuggestedActionDial = RbmSuggestedActionDial;
class RbmSuggestedActionOpenUri {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RbmSuggestedActionOpenUri.prototype, "uri", void 0);
exports.RbmSuggestedActionOpenUri = RbmSuggestedActionOpenUri;
class RbmSuggestedActionShareLocation {
}
exports.RbmSuggestedActionShareLocation = RbmSuggestedActionShareLocation;
//# sourceMappingURL=RbmSuggestion.js.map