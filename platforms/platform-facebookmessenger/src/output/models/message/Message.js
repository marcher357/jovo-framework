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
exports.Message = void 0;
const output_1 = require("@jovotech/output");
const constants_1 = require("../../constants");
const TransformQuickReply_1 = require("../../decorators/transformation/TransformQuickReply");
const MessageAttachment_1 = require("./MessageAttachment");
class Message {
}
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['text', 'attachment'],
        validate: (value) => {
            if (!(0, output_1.isString)(value)) {
                return '$property must be a string';
            }
            if (!value) {
                return '$property should not be empty';
            }
            if (value.length > constants_1.MESSAGE_TEXT_MAX_LENGTH) {
                return `$property can not exceed ${constants_1.MESSAGE_TEXT_MAX_LENGTH} characters`;
            }
            return;
        },
    }),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['text', 'attachment'],
        validate: async (value) => {
            if (!(value instanceof MessageAttachment_1.MessageAttachment)) {
                return '$property must be an instance of MessageAttachment';
            }
            const errors = await (0, output_1.validate)(value);
            if (errors.length) {
                return (0, output_1.formatValidationErrors)(errors, {
                    text: '$property is invalid:',
                    delimiter: '\n  - ',
                    path: '$property',
                });
            }
        },
    }),
    (0, output_1.Type)(() => MessageAttachment_1.MessageAttachment),
    __metadata("design:type", MessageAttachment_1.MessageAttachment)
], Message.prototype, "attachment", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsArray)(),
    (0, output_1.ArrayMaxSize)(constants_1.QUICK_REPLIES_MAX_SIZE),
    (0, output_1.ValidateNested)({ each: true }),
    (0, TransformQuickReply_1.TransformQuickReply)(),
    __metadata("design:type", Array)
], Message.prototype, "quick_replies", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsString)(),
    (0, output_1.MaxLength)(constants_1.PAYLOAD_MAX_LENGTH),
    __metadata("design:type", String)
], Message.prototype, "metadata", void 0);
exports.Message = Message;
//# sourceMappingURL=Message.js.map