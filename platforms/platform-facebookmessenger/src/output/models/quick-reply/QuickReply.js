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
exports.QuickReplyBase = exports.QuickReplyContentType = void 0;
const output_1 = require("@jovotech/output");
var QuickReplyContentType;
(function (QuickReplyContentType) {
    QuickReplyContentType["Text"] = "text";
    QuickReplyContentType["UserEmail"] = "user_email";
    QuickReplyContentType["UserPhoneNumber"] = "user_phone_number";
})(QuickReplyContentType = exports.QuickReplyContentType || (exports.QuickReplyContentType = {}));
class QuickReplyBase {
}
__decorate([
    (0, output_1.IsEnum)(QuickReplyContentType),
    __metadata("design:type", String)
], QuickReplyBase.prototype, "content_type", void 0);
exports.QuickReplyBase = QuickReplyBase;
//# sourceMappingURL=QuickReply.js.map