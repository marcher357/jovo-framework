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
exports.RbmCarouselCard = exports.CardWidth = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../../constants");
const RbmCardContent_1 = require("./RbmCardContent");
var CardWidth;
(function (CardWidth) {
    CardWidth["Unspecified"] = "CARD_WIDTH_UNSPECIFIED";
    CardWidth["Small"] = "SMALL";
    CardWidth["Medium"] = "MEDIUM";
})(CardWidth = exports.CardWidth || (exports.CardWidth = {}));
class RbmCarouselCard {
}
__decorate([
    (0, output_1.IsEnum)(CardWidth),
    __metadata("design:type", String)
], RbmCarouselCard.prototype, "card_width", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMinSize)(constants_1.RBM_CAROUSEL_MIN_SIZE),
    (0, output_1.ArrayMaxSize)(constants_1.RBM_CAROUSEL_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => RbmCardContent_1.RbmCardContent),
    __metadata("design:type", Array)
], RbmCarouselCard.prototype, "card_contents", void 0);
exports.RbmCarouselCard = RbmCarouselCard;
//# sourceMappingURL=RbmCarouselCard.js.map