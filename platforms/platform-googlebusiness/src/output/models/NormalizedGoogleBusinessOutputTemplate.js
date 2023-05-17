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
exports.NormalizedGoogleBusinessOutputTemplate = void 0;
const output_1 = require("@jovotech/output");
const GoogleBusinessOutputTemplateResponse_1 = require("./GoogleBusinessOutputTemplateResponse");
const Image_1 = require("./Image");
const Suggestion_1 = require("./Suggestion");
class NormalizedGoogleBusinessOutputTemplate extends output_1.NormalizedPlatformOutputTemplate {
}
__decorate([
    (0, output_1.Type)(() => GoogleBusinessOutputTemplateResponse_1.GoogleBusinessOutputTemplateResponse),
    __metadata("design:type", GoogleBusinessOutputTemplateResponse_1.GoogleBusinessOutputTemplateResponse)
], NormalizedGoogleBusinessOutputTemplate.prototype, "nativeResponse", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    __metadata("design:type", String)
], NormalizedGoogleBusinessOutputTemplate.prototype, "fallback", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => Image_1.Image),
    __metadata("design:type", Image_1.Image)
], NormalizedGoogleBusinessOutputTemplate.prototype, "image", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => Suggestion_1.Suggestion),
    __metadata("design:type", Array)
], NormalizedGoogleBusinessOutputTemplate.prototype, "suggestions", void 0);
exports.NormalizedGoogleBusinessOutputTemplate = NormalizedGoogleBusinessOutputTemplate;
//# sourceMappingURL=NormalizedGoogleBusinessOutputTemplate.js.map