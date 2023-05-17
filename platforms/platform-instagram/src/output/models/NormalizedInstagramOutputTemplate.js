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
exports.NormalizedInstagramOutputTemplate = void 0;
const output_1 = require("@jovotech/output");
const platform_facebookmessenger_1 = require("@jovotech/platform-facebookmessenger");
const InstagramOutputTemplateResponse_1 = require("./InstagramOutputTemplateResponse");
class NormalizedInstagramOutputTemplate extends output_1.NormalizedPlatformOutputTemplate {
}
__decorate([
    (0, output_1.Type)(() => InstagramOutputTemplateResponse_1.InstagramOutputTemplateResponse),
    __metadata("design:type", InstagramOutputTemplateResponse_1.InstagramOutputTemplateResponse)
], NormalizedInstagramOutputTemplate.prototype, "nativeResponse", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)(),
    (0, platform_facebookmessenger_1.TransformQuickReply)(),
    __metadata("design:type", Array)
], NormalizedInstagramOutputTemplate.prototype, "nativeQuickReplies", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, platform_facebookmessenger_1.TransformTemplate)(),
    __metadata("design:type", Object)
], NormalizedInstagramOutputTemplate.prototype, "template", void 0);
exports.NormalizedInstagramOutputTemplate = NormalizedInstagramOutputTemplate;
//# sourceMappingURL=NormalizedInstagramOutputTemplate.js.map