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
exports.GoogleBusinessOutputTemplateResponse = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../constants");
const Image_1 = require("./Image");
const Representative_1 = require("./Representative");
const RichCard_1 = require("./RichCard");
const Suggestion_1 = require("./Suggestion");
class GoogleBusinessOutputTemplateResponse {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.Matches)('conversations[/].*[/]messages[/].*[^/]'),
    __metadata("design:type", String)
], GoogleBusinessOutputTemplateResponse.prototype, "name", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleBusinessOutputTemplateResponse.prototype, "messageId", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => Representative_1.Representative),
    __metadata("design:type", Representative_1.Representative)
], GoogleBusinessOutputTemplateResponse.prototype, "representative", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.SUGGESTIONS_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => Suggestion_1.Suggestion),
    __metadata("design:type", Array)
], GoogleBusinessOutputTemplateResponse.prototype, "suggestions", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleBusinessOutputTemplateResponse.prototype, "fallback", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GoogleBusinessOutputTemplateResponse.prototype, "containsRichText", void 0);
__decorate([
    (0, output_1.IsOptional)(),
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
], GoogleBusinessOutputTemplateResponse.prototype, "text", void 0);
__decorate([
    (0, output_1.IsOptional)(),
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
    (0, output_1.Type)(() => Image_1.Image),
    __metadata("design:type", Image_1.Image)
], GoogleBusinessOutputTemplateResponse.prototype, "image", void 0);
__decorate([
    (0, output_1.IsOptional)(),
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
    (0, output_1.Type)(() => RichCard_1.RichCard),
    __metadata("design:type", RichCard_1.RichCard)
], GoogleBusinessOutputTemplateResponse.prototype, "richCard", void 0);
exports.GoogleBusinessOutputTemplateResponse = GoogleBusinessOutputTemplateResponse;
//# sourceMappingURL=GoogleBusinessOutputTemplateResponse.js.map