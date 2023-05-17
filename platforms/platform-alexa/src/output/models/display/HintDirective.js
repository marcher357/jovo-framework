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
exports.HintDirective = void 0;
const output_1 = require("@jovotech/output");
const Directive_1 = require("../Directive");
const TextContentItem_1 = require("./TextContentItem");
class HintDirective extends Directive_1.Directive {
}
__decorate([
    (0, output_1.Equals)('Hint'),
    __metadata("design:type", String)
], HintDirective.prototype, "type", void 0);
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => TextContentItem_1.TextContentItem),
    __metadata("design:type", TextContentItem_1.TextContentItem)
], HintDirective.prototype, "hint", void 0);
exports.HintDirective = HintDirective;
//# sourceMappingURL=HintDirective.js.map