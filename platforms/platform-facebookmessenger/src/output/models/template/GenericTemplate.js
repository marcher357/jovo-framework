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
exports.GenericTemplate = exports.GenericTemplateElement = exports.GenericTemplateDefaultAction = exports.ImageAspectRatio = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const TransformButton_1 = require("../../decorators/transformation/TransformButton");
const Button_1 = require("../button/Button");
const UrlButton_1 = require("../button/UrlButton");
const Template_1 = require("./Template");
var ImageAspectRatio;
(function (ImageAspectRatio) {
    ImageAspectRatio["Horizontal"] = "horizontal";
    ImageAspectRatio["Square"] = "square";
})(ImageAspectRatio = exports.ImageAspectRatio || (exports.ImageAspectRatio = {}));
class GenericTemplateDefaultAction {
}
__decorate([
    (0, output_1.Equals)(Button_1.ButtonType.Url),
    __metadata("design:type", String)
], GenericTemplateDefaultAction.prototype, "type", void 0);
__decorate([
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], GenericTemplateDefaultAction.prototype, "url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(UrlButton_1.WebViewHeightRatio),
    __metadata("design:type", String)
], GenericTemplateDefaultAction.prototype, "webview_height_ratio", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GenericTemplateDefaultAction.prototype, "messenger_extensions", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], GenericTemplateDefaultAction.prototype, "fallback_url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenericTemplateDefaultAction.prototype, "webview_share_button", void 0);
exports.GenericTemplateDefaultAction = GenericTemplateDefaultAction;
class GenericTemplateElement {
    toCard() {
        const card = {
            title: this.title,
        };
        if (this.subtitle) {
            card.subtitle = this.subtitle;
        }
        if (this.image_url) {
            card.imageUrl = this.image_url;
        }
        return card;
    }
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.GENERIC_TEMPLATE_ELEMENT_TEXT_MAX_LENGTH),
    __metadata("design:type", String)
], GenericTemplateElement.prototype, "title", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.GENERIC_TEMPLATE_ELEMENT_TEXT_MAX_LENGTH),
    __metadata("design:type", String)
], GenericTemplateElement.prototype, "subtitle", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], GenericTemplateElement.prototype, "image_url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => GenericTemplateDefaultAction),
    __metadata("design:type", GenericTemplateDefaultAction)
], GenericTemplateElement.prototype, "default_action", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.GENERIC_TEMPLATE_BUTTONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, TransformButton_1.TransformButton)(),
    __metadata("design:type", Array)
], GenericTemplateElement.prototype, "buttons", void 0);
exports.GenericTemplateElement = GenericTemplateElement;
class GenericTemplate extends Template_1.TemplateBase {
    toCarousel() {
        return {
            items: this.elements.map((element) => element.toCard()),
        };
    }
}
__decorate([
    (0, output_1.Equals)(Template_1.TemplateType.Generic),
    __metadata("design:type", String)
], GenericTemplate.prototype, "template_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(ImageAspectRatio),
    __metadata("design:type", String)
], GenericTemplate.prototype, "image_aspect_ratio", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.GENERIC_TEMPLATE_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => GenericTemplateElement),
    __metadata("design:type", Array)
], GenericTemplate.prototype, "elements", void 0);
exports.GenericTemplate = GenericTemplate;
//# sourceMappingURL=GenericTemplate.js.map