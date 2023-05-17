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
exports.CardContent = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const Suggestion_1 = require("../Suggestion");
const Media_1 = require("./Media");
class CardContent {
    toCard() {
        const card = {
            title: this.title || '',
        };
        if (this.description) {
            card.content = this.description;
        }
        if (this.media) {
            card.imageUrl = this.media.contentInfo.fileUrl;
            card.imageAlt = this.media.contentInfo.altText;
        }
        return card;
    }
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.CARD_CONTENT_TITLE_MAX_LENGTH),
    __metadata("design:type", String)
], CardContent.prototype, "title", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.CARD_CONTENT_DESCRIPTION_MAX_LENGTH),
    __metadata("design:type", String)
], CardContent.prototype, "description", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => Media_1.Media),
    __metadata("design:type", Media_1.Media)
], CardContent.prototype, "media", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.CARD_CONTENT_SUGGESTIONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => Suggestion_1.Suggestion),
    __metadata("design:type", Array)
], CardContent.prototype, "suggestions", void 0);
exports.CardContent = CardContent;
//# sourceMappingURL=CardContent.js.map