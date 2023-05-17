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
exports.RbmStandaloneCard = exports.ThumbnailImageAlignment = exports.CardOrientation = void 0;
const output_1 = require("@jovotech/output");
const RbmCardContent_1 = require("./RbmCardContent");
var CardOrientation;
(function (CardOrientation) {
    CardOrientation["Unspecified"] = "CARD_ORIENTATION_UNSPECIFIED";
    CardOrientation["Horizontal"] = "HORIZONTAL";
    CardOrientation["Vertical"] = "VERTICAL";
})(CardOrientation = exports.CardOrientation || (exports.CardOrientation = {}));
var ThumbnailImageAlignment;
(function (ThumbnailImageAlignment) {
    ThumbnailImageAlignment["Unspecified"] = "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED";
    ThumbnailImageAlignment["Left"] = "LEFT";
    ThumbnailImageAlignment["Right"] = "RIGHT";
})(ThumbnailImageAlignment = exports.ThumbnailImageAlignment || (exports.ThumbnailImageAlignment = {}));
class RbmStandaloneCard {
}
__decorate([
    (0, output_1.IsEnum)(CardOrientation),
    __metadata("design:type", String)
], RbmStandaloneCard.prototype, "card_orientation", void 0);
__decorate([
    (0, output_1.ValidateIf)((o) => o.card_orientation === CardOrientation.Horizontal || o.thumbnail_image_alignment),
    (0, output_1.IsEnum)(ThumbnailImageAlignment),
    __metadata("design:type", String)
], RbmStandaloneCard.prototype, "thumbnail_image_alignment", void 0);
__decorate([
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => RbmCardContent_1.RbmCardContent),
    __metadata("design:type", RbmCardContent_1.RbmCardContent)
], RbmStandaloneCard.prototype, "card_content", void 0);
exports.RbmStandaloneCard = RbmStandaloneCard;
//# sourceMappingURL=RbmStandaloneCard.js.map