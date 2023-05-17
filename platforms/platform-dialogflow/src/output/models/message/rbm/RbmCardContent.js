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
exports.RbmMedia = exports.Height = exports.RbmCardContent = void 0;
const output_1 = require("@jovotech/output");
const RbmSuggestion_1 = require("./RbmSuggestion");
class RbmCardContent {
}
__decorate([
    (0, output_1.IsSomeValid)({
        keys: ['title', 'description', 'media'],
        validate: (value) => {
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
], RbmCardContent.prototype, "title", void 0);
__decorate([
    (0, output_1.IsSomeValid)({
        keys: ['title', 'description', 'media'],
        validate: (value) => {
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
], RbmCardContent.prototype, "description", void 0);
__decorate([
    (0, output_1.IsSomeValid)({
        keys: ['title', 'description', 'media'],
        validate: async (value) => {
            if (!(value instanceof RbmMedia)) {
                return `$property has to be an instance of RbmMedia`;
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
    (0, output_1.Type)(() => RbmMedia),
    __metadata("design:type", RbmMedia)
], RbmCardContent.prototype, "media", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ValidateNested)({ each: true }),
    (0, output_1.Type)(() => RbmSuggestion_1.RbmSuggestion),
    __metadata("design:type", Array)
], RbmCardContent.prototype, "suggestions", void 0);
exports.RbmCardContent = RbmCardContent;
var Height;
(function (Height) {
    Height["Unspecified"] = "HEIGHT_UNSPECIFIED";
    Height["Short"] = "SHORT";
    Height["Medium"] = "MEDIUM";
    Height["Tall"] = "TALL";
})(Height = exports.Height || (exports.Height = {}));
class RbmMedia {
}
__decorate([
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RbmMedia.prototype, "file_uri", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RbmMedia.prototype, "thumbnail_uri", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(Height),
    __metadata("design:type", String)
], RbmMedia.prototype, "height", void 0);
exports.RbmMedia = RbmMedia;
//# sourceMappingURL=RbmCardContent.js.map