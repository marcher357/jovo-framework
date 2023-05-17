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
exports.TextQuickReply = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const CastedMaxLength_1 = require("../../decorators/validation/CastedMaxLength");
const QuickReply_1 = require("./QuickReply");
class TextQuickReply extends QuickReply_1.QuickReplyBase {
    toQuickReply() {
        return this.payload
            ? {
                text: this.title,
                value: this.payload.toString(),
            }
            : this.title;
    }
}
__decorate([
    (0, output_1.Equals)(QuickReply_1.QuickReplyContentType.Text),
    __metadata("design:type", String)
], TextQuickReply.prototype, "content_type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.MaxLength)(constants_1.QUICK_REPLY_TITLE_MAX_LENGTH),
    __metadata("design:type", String)
], TextQuickReply.prototype, "title", void 0);
__decorate([
    (0, output_1.IsOfEitherType)(['string', 'number']),
    (0, CastedMaxLength_1.CastedMaxLength)(constants_1.PAYLOAD_MAX_LENGTH),
    __metadata("design:type", Object)
], TextQuickReply.prototype, "payload", void 0);
__decorate([
    (0, output_1.ValidateIf)((o) => !o.title || o.image_url),
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], TextQuickReply.prototype, "image_url", void 0);
exports.TextQuickReply = TextQuickReply;
//# sourceMappingURL=TextQuickReply.js.map