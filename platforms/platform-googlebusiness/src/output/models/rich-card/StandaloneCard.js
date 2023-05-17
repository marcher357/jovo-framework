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
exports.StandaloneCard = void 0;
const output_1 = require("@jovotech/output");
const CardContent_1 = require("./CardContent");
class StandaloneCard {
    toCard() {
        return this.cardContent.toCard();
    }
}
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => CardContent_1.CardContent),
    __metadata("design:type", CardContent_1.CardContent)
], StandaloneCard.prototype, "cardContent", void 0);
exports.StandaloneCard = StandaloneCard;
//# sourceMappingURL=StandaloneCard.js.map