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
exports.TemplateBase = exports.TemplateType = void 0;
const output_1 = require("@jovotech/output");
var TemplateType;
(function (TemplateType) {
    TemplateType["Generic"] = "generic";
    TemplateType["Button"] = "button";
    TemplateType["Media"] = "media";
    TemplateType["Receipt"] = "receipt";
})(TemplateType = exports.TemplateType || (exports.TemplateType = {}));
class TemplateBase {
}
__decorate([
    (0, output_1.IsEnum)(TemplateType),
    __metadata("design:type", String)
], TemplateBase.prototype, "template_type", void 0);
exports.TemplateBase = TemplateBase;
//# sourceMappingURL=Template.js.map