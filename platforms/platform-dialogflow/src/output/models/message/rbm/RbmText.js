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
exports.RbmText = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../../constants");
const RbmSuggestion_1 = require("./RbmSuggestion");
class RbmText {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RbmText.prototype, "text", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMinSize)(constants_1.RBM_TEXT_SUGGESTIONS_MIN_SIZE),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => RbmSuggestion_1.RbmSuggestion),
    __metadata("design:type", Array)
], RbmText.prototype, "rbm_suggestion", void 0);
exports.RbmText = RbmText;
//# sourceMappingURL=RbmText.js.map