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
exports.FacebookMessengerOutputTemplateResponse = void 0;
const output_1 = require("@jovotech/output");
const IdentityData_1 = require("./common/IdentityData");
const FacebookMessengerResponse_1 = require("../../FacebookMessengerResponse");
const Message_1 = require("./message/Message");
class FacebookMessengerOutputTemplateResponse {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(FacebookMessengerResponse_1.MessagingType),
    __metadata("design:type", String)
], FacebookMessengerOutputTemplateResponse.prototype, "messaging_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => IdentityData_1.IdentityData),
    __metadata("design:type", IdentityData_1.IdentityData)
], FacebookMessengerOutputTemplateResponse.prototype, "recipient", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEitherValid)({
        keys: ['message', 'sender_action'],
        validate: async (value) => {
            if (!(value instanceof Message_1.Message)) {
                return '$property must be an instance of Message';
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
    (0, output_1.Type)(() => Message_1.Message),
    __metadata("design:type", Message_1.Message)
], FacebookMessengerOutputTemplateResponse.prototype, "message", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEitherValid)({
        keys: ['message', 'sender_action'],
        validate: (value) => {
            if (!(0, output_1.isEnum)(value, FacebookMessengerResponse_1.SenderActionType)) {
                return '$property must be a valid enum value';
            }
        },
    }),
    __metadata("design:type", String)
], FacebookMessengerOutputTemplateResponse.prototype, "sender_action", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(FacebookMessengerResponse_1.NotificationType),
    __metadata("design:type", String)
], FacebookMessengerOutputTemplateResponse.prototype, "notification_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(FacebookMessengerResponse_1.MessageTag),
    __metadata("design:type", String)
], FacebookMessengerOutputTemplateResponse.prototype, "tag", void 0);
exports.FacebookMessengerOutputTemplateResponse = FacebookMessengerOutputTemplateResponse;
//# sourceMappingURL=FacebookMessengerOutputTemplateResponse.js.map