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
exports.MediaTemplate = exports.MediaTemplateElement = exports.MediaTemplateElementType = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const TransformButton_1 = require("../../decorators/transformation/TransformButton");
const Template_1 = require("./Template");
var MediaTemplateElementType;
(function (MediaTemplateElementType) {
    MediaTemplateElementType["Image"] = "image";
    MediaTemplateElementType["Video"] = "video";
})(MediaTemplateElementType = exports.MediaTemplateElementType || (exports.MediaTemplateElementType = {}));
class MediaTemplateElement {
}
__decorate([
    (0, output_1.IsEnum)(MediaTemplateElementType),
    __metadata("design:type", String)
], MediaTemplateElement.prototype, "media_type", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['attachment_id', 'url'],
        validate: (value) => {
            if (!(0, output_1.isString)(value)) {
                return '$property must be a string';
            }
            if (!value) {
                return '$property should not be empty';
            }
        },
    }),
    __metadata("design:type", String)
], MediaTemplateElement.prototype, "attachment_id", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['attachment_id', 'url'],
        validate: (value) => {
            if (!(0, output_1.isString)(value) || !(0, output_1.isURL)(value)) {
                return '$property must be an URL address';
            }
        },
    }),
    __metadata("design:type", String)
], MediaTemplateElement.prototype, "url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.MEDIA_TEMPLATE_BUTTONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, TransformButton_1.TransformButton)(),
    __metadata("design:type", Array)
], MediaTemplateElement.prototype, "buttons", void 0);
exports.MediaTemplateElement = MediaTemplateElement;
class MediaTemplate extends Template_1.TemplateBase {
}
__decorate([
    (0, output_1.Equals)(Template_1.TemplateType.Media),
    __metadata("design:type", String)
], MediaTemplate.prototype, "template_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MediaTemplate.prototype, "sharable", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMinSize)(constants_1.MEDIA_TEMPLATE_ELEMENTS_SIZE),
    (0, output_1.ArrayMaxSize)(constants_1.MEDIA_TEMPLATE_ELEMENTS_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => MediaTemplateElement),
    __metadata("design:type", Array)
], MediaTemplate.prototype, "elements", void 0);
exports.MediaTemplate = MediaTemplate;
//# sourceMappingURL=MediaTemplate.js.map