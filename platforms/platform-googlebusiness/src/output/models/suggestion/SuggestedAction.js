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
exports.SuggestedAction = void 0;
const output_1 = require("@jovotech/output");
const IsValidSuggestedActionObject_1 = require("../../decorators/validation/IsValidSuggestedActionObject");
const DialAction_1 = require("./DialAction");
const OpenUrlAction_1 = require("./OpenUrlAction");
const SuggestedReply_1 = require("./SuggestedReply");
class SuggestedAction extends SuggestedReply_1.SuggestedReply {
}
__decorate([
    (0, IsValidSuggestedActionObject_1.IsValidSuggestedActionObject)(),
    (0, output_1.Type)(() => OpenUrlAction_1.OpenUrlAction),
    __metadata("design:type", OpenUrlAction_1.OpenUrlAction)
], SuggestedAction.prototype, "openUrlAction", void 0);
__decorate([
    (0, IsValidSuggestedActionObject_1.IsValidSuggestedActionObject)(),
    (0, output_1.Type)(() => DialAction_1.DialAction),
    __metadata("design:type", DialAction_1.DialAction)
], SuggestedAction.prototype, "dialAction", void 0);
exports.SuggestedAction = SuggestedAction;
//# sourceMappingURL=SuggestedAction.js.map