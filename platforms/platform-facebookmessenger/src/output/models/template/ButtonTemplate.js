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
exports.ButtonTemplate = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const TransformButton_1 = require("../../decorators/transformation/TransformButton");
const Template_1 = require("./Template");
class ButtonTemplate extends Template_1.TemplateBase {
}
__decorate([
    (0, output_1.Equals)(Template_1.TemplateType.Button),
    __metadata("design:type", String)
], ButtonTemplate.prototype, "template_type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    (0, output_1.MaxLength)(constants_1.BUTTON_TEMPLATE_TEXT_MAX_LENGTH),
    __metadata("design:type", String)
], ButtonTemplate.prototype, "text", void 0);
__decorate([
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMinSize)(constants_1.BUTTON_TEMPLATE_BUTTONS_MIN_SIZE),
    (0, output_1.ArrayMaxSize)(constants_1.BUTTON_TEMPLATE_BUTTONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, TransformButton_1.TransformButton)(),
    __metadata("design:type", Array)
], ButtonTemplate.prototype, "buttons", void 0);
exports.ButtonTemplate = ButtonTemplate;
//# sourceMappingURL=ButtonTemplate.js.map