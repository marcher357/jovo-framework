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
exports.GoogleBusinessResponse = void 0;
const output_1 = require("@jovotech/output");
const output_2 = require("./output");
class GoogleBusinessResponse extends output_1.JovoResponse {
    hasSessionEnded() {
        return false;
    }
}
__decorate([
    (0, output_1.IsString)(),
    __metadata("design:type", String)
], GoogleBusinessResponse.prototype, "messageId", void 0);
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => output_2.Representative),
    __metadata("design:type", output_2.Representative)
], GoogleBusinessResponse.prototype, "representative", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(output_2.SUGGESTIONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => output_2.Suggestion),
    __metadata("design:type", Array)
], GoogleBusinessResponse.prototype, "suggestions", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleBusinessResponse.prototype, "fallback", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GoogleBusinessResponse.prototype, "containsRichText", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        name: 'isValidGoogleBusinessResponseContent',
        keys: ['text', 'image', 'richCard'],
        validate: async (value) => {
            if (!(0, output_1.isString)(value)) {
                return '$property must be a string';
            }
            if (!value) {
                return '$property should not be empty';
            }
            return;
        },
    }),
    __metadata("design:type", String)
], GoogleBusinessResponse.prototype, "text", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        name: 'isValidGoogleBusinessResponseContent',
        keys: ['text', 'image', 'richCard'],
        validate: async (value) => {
            if (!(0, output_1.isObject)(value)) {
                return '$property must be an object.';
            }
            const errors = await (0, output_1.validate)(value);
            if (errors.length) {
                return (0, output_1.formatValidationErrors)(errors, {
                    text: '$property is invalid:',
                    delimiter: '\n  - ',
                    path: '$property',
                });
            }
            return;
        },
    }),
    (0, output_1.Type)(() => output_2.Image),
    __metadata("design:type", output_2.Image)
], GoogleBusinessResponse.prototype, "image", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        name: 'isValidGoogleBusinessResponseContent',
        keys: ['text', 'image', 'richCard'],
        validate: async (value) => {
            if (!(0, output_1.isObject)(value)) {
                return '$property must be an object.';
            }
            const errors = await (0, output_1.validate)(value);
            if (errors.length) {
                return (0, output_1.formatValidationErrors)(errors, {
                    text: '$property is invalid:',
                    delimiter: '\n  - ',
                    path: '$property',
                });
            }
            return;
        },
    }),
    (0, output_1.Type)(() => output_2.RichCard),
    __metadata("design:type", output_2.RichCard)
], GoogleBusinessResponse.prototype, "richCard", void 0);
exports.GoogleBusinessResponse = GoogleBusinessResponse;
//# sourceMappingURL=GoogleBusinessResponse.js.map