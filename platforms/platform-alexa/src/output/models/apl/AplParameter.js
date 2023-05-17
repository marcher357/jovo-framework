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
exports.AplParameter = exports.AplType = void 0;
const output_1 = require("@jovotech/output");
var AplType;
(function (AplType) {
    AplType["Any"] = "any";
    AplType["Array"] = "array";
    AplType["Boolean"] = "boolean";
    AplType["Color"] = "color";
    AplType["Component"] = "component";
    AplType["Dimension"] = "dimension";
    AplType["Integer"] = "integer";
    AplType["Map"] = "map";
    AplType["Number"] = "number";
    AplType["Object"] = "object";
    AplType["String"] = "string";
})(AplType = exports.AplType || (exports.AplType = {}));
class AplParameter {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(AplType),
    __metadata("design:type", String)
], AplParameter.prototype, "type", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AplParameter.prototype, "name", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    __metadata("design:type", Object)
], AplParameter.prototype, "default", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AplParameter.prototype, "description", void 0);
exports.AplParameter = AplParameter;
//# sourceMappingURL=AplParameter.js.map