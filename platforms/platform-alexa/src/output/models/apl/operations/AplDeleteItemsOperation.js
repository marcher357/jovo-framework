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
exports.AplDeleteItemsOperation = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../../constants");
const AplOperation_1 = require("../AplOperation");
class AplDeleteItemsOperation extends AplOperation_1.AplOperation {
}
__decorate([
    (0, output_1.Equals)(AplOperation_1.AplOperationType.DeleteItems),
    __metadata("design:type", String)
], AplDeleteItemsOperation.prototype, "type", void 0);
__decorate([
    (0, output_1.IsInt)(),
    (0, output_1.Min)(constants_1.APL_OPERATION_COUNT_MIN),
    __metadata("design:type", Number)
], AplDeleteItemsOperation.prototype, "count", void 0);
exports.AplDeleteItemsOperation = AplDeleteItemsOperation;
//# sourceMappingURL=AplDeleteItemsOperation.js.map