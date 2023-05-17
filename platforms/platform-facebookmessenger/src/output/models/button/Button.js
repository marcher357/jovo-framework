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
exports.ButtonBase = exports.ButtonType = void 0;
const output_1 = require("@jovotech/output");
var ButtonType;
(function (ButtonType) {
    ButtonType["Url"] = "web_url";
    ButtonType["Postback"] = "postback";
    ButtonType["Call"] = "phone_number";
    ButtonType["LogIn"] = "account_link";
    ButtonType["LogOut"] = "account_unlink";
    ButtonType["GamePlay"] = "game_play";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
class ButtonBase {
}
__decorate([
    (0, output_1.IsEnum)(ButtonType),
    __metadata("design:type", String)
], ButtonBase.prototype, "type", void 0);
exports.ButtonBase = ButtonBase;
//# sourceMappingURL=Button.js.map