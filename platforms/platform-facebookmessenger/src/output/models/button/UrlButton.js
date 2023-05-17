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
exports.UrlButton = exports.WebViewHeightRatio = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const Button_1 = require("./Button");
var WebViewHeightRatio;
(function (WebViewHeightRatio) {
    WebViewHeightRatio["Compact"] = "COMPACT";
    WebViewHeightRatio["Tall"] = "TALL";
    WebViewHeightRatio["Full"] = "FULL";
})(WebViewHeightRatio = exports.WebViewHeightRatio || (exports.WebViewHeightRatio = {}));
class UrlButton extends Button_1.ButtonBase {
}
__decorate([
    (0, output_1.Equals)(Button_1.ButtonType.Url),
    __metadata("design:type", String)
], UrlButton.prototype, "type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.BUTTON_TITLE_MAX_LENGTH),
    __metadata("design:type", String)
], UrlButton.prototype, "title", void 0);
__decorate([
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], UrlButton.prototype, "url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(WebViewHeightRatio),
    __metadata("design:type", String)
], UrlButton.prototype, "webview_height_ratio", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UrlButton.prototype, "messenger_extensions", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], UrlButton.prototype, "fallback_url", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UrlButton.prototype, "webview_share_button", void 0);
exports.UrlButton = UrlButton;
//# sourceMappingURL=UrlButton.js.map