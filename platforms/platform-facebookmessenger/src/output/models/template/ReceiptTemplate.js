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
exports.ReceiptTemplate = exports.ReceiptTemplateElement = exports.ReceiptAdjustment = exports.ReceiptSummary = exports.ReceiptAddress = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const Template_1 = require("./Template");
class ReceiptAddress {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "street_1", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "street_2", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "city", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "postal_code", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "state", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.Length)(constants_1.ADDRESS_COUNTRY_LENGTH),
    __metadata("design:type", String)
], ReceiptAddress.prototype, "country", void 0);
exports.ReceiptAddress = ReceiptAddress;
class ReceiptSummary {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptSummary.prototype, "subtotal", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptSummary.prototype, "shipping_cost", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptSummary.prototype, "total_tax", void 0);
__decorate([
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptSummary.prototype, "total_cost", void 0);
exports.ReceiptSummary = ReceiptSummary;
class ReceiptAdjustment {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptAdjustment.prototype, "name", void 0);
__decorate([
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptAdjustment.prototype, "amount", void 0);
exports.ReceiptAdjustment = ReceiptAdjustment;
class ReceiptTemplateElement {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplateElement.prototype, "title", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplateElement.prototype, "subtitle", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsInt)(),
    __metadata("design:type", Number)
], ReceiptTemplateElement.prototype, "quantity", void 0);
__decorate([
    (0, output_1.IsNumber)(),
    __metadata("design:type", Number)
], ReceiptTemplateElement.prototype, "price", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplateElement.prototype, "currency", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsUrl)(),
    __metadata("design:type", String)
], ReceiptTemplateElement.prototype, "image_url", void 0);
exports.ReceiptTemplateElement = ReceiptTemplateElement;
class ReceiptTemplate extends Template_1.TemplateBase {
}
__decorate([
    (0, output_1.Equals)(Template_1.TemplateType.Receipt),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "template_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReceiptTemplate.prototype, "sharable", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "recipient_name", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "merchant_name", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "order_number", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "currency", void 0);
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "payment_method", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsNumberString)(),
    __metadata("design:type", String)
], ReceiptTemplate.prototype, "timestamp", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.RECEIPT_TEMPLATE_ELEMENTS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => ReceiptTemplateElement),
    __metadata("design:type", Array)
], ReceiptTemplate.prototype, "elements", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => ReceiptAddress),
    __metadata("design:type", ReceiptAddress)
], ReceiptTemplate.prototype, "address", void 0);
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => ReceiptSummary),
    __metadata("design:type", ReceiptSummary)
], ReceiptTemplate.prototype, "summary", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => ReceiptAdjustment),
    __metadata("design:type", Array)
], ReceiptTemplate.prototype, "adjustments", void 0);
exports.ReceiptTemplate = ReceiptTemplate;
//# sourceMappingURL=ReceiptTemplate.js.map