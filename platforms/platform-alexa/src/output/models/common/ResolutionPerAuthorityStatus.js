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
exports.ResolutionPerAuthorityStatus = exports.ResolutionPerAuthorityStatusCode = void 0;
const output_1 = require("@jovotech/output");
var ResolutionPerAuthorityStatusCode;
(function (ResolutionPerAuthorityStatusCode) {
    ResolutionPerAuthorityStatusCode["SuccessMatch"] = "ER_SUCCESS_MATCH";
    ResolutionPerAuthorityStatusCode["SuccessNoMatch"] = "ER_SUCCESS_NO_MATCH";
    ResolutionPerAuthorityStatusCode["ErrorTimeout"] = "ER_ERROR_TIMEOUT";
    ResolutionPerAuthorityStatusCode["ErrorException"] = "ER_ERROR_EXCEPTION";
})(ResolutionPerAuthorityStatusCode = exports.ResolutionPerAuthorityStatusCode || (exports.ResolutionPerAuthorityStatusCode = {}));
class ResolutionPerAuthorityStatus {
}
__decorate([
    (0, output_1.IsEnum)(ResolutionPerAuthorityStatusCode),
    __metadata("design:type", String)
], ResolutionPerAuthorityStatus.prototype, "code", void 0);
exports.ResolutionPerAuthorityStatus = ResolutionPerAuthorityStatus;
//# sourceMappingURL=ResolutionPerAuthorityStatus.js.map