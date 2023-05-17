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
exports.PostbackButton = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const Button_1 = require("./Button");
class PostbackButton extends Button_1.ButtonBase {
}
__decorate([
    (0, output_1.Equals)(Button_1.ButtonType.Postback),
    __metadata("design:type", String)
], PostbackButton.prototype, "type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.BUTTON_TITLE_MAX_LENGTH),
    __metadata("design:type", String)
], PostbackButton.prototype, "title", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.PAYLOAD_MAX_LENGTH),
    __metadata("design:type", String)
], PostbackButton.prototype, "payload", void 0);
exports.PostbackButton = PostbackButton;
//# sourceMappingURL=PostbackButton.js.map