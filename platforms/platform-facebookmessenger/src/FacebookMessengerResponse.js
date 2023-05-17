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
exports.FacebookMessengerResponse = exports.MessageTag = exports.NotificationType = exports.SenderActionType = exports.MessagingType = void 0;
const output_1 = require("@jovotech/output");
const output_2 = require("./output");
var MessagingType;
(function (MessagingType) {
    MessagingType["Response"] = "RESPONSE";
    MessagingType["Update"] = "UPDATE";
    MessagingType["MessageTag"] = "MESSAGE_TAG";
})(MessagingType = exports.MessagingType || (exports.MessagingType = {}));
var SenderActionType;
(function (SenderActionType) {
    SenderActionType["MarkSeen"] = "mark_seen";
    SenderActionType["TypingOn"] = "typing_on";
    SenderActionType["TypingOff"] = "typing_off";
})(SenderActionType = exports.SenderActionType || (exports.SenderActionType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["Regular"] = "REGULAR";
    NotificationType["SilentPush"] = "SILENT_PUSH";
    NotificationType["NoPush"] = "NO_PUSH";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var MessageTag;
(function (MessageTag) {
    MessageTag["ConfirmedEventUpdate"] = "CONFIRMED_EVENT_UPDATE";
    MessageTag["PostPurchaseUpdate"] = "POST_PURCHASE_UPDATE";
    MessageTag["AccountUpdate"] = "ACCOUNT_UPDATE";
    MessageTag["HumanAgent"] = "HUMAN_AGENT";
})(MessageTag = exports.MessageTag || (exports.MessageTag = {}));
class FacebookMessengerResponse extends output_1.JovoResponse {
    hasSessionEnded() {
        return false;
    }
}
__decorate([
    (0, output_1.IsEnum)(MessagingType),
    __metadata("design:type", String)
], FacebookMessengerResponse.prototype, "messaging_type", void 0);
__decorate([
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => output_2.IdentityData),
    __metadata("design:type", output_2.IdentityData)
], FacebookMessengerResponse.prototype, "recipient", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['message', 'sender_action'],
        validate: async (value) => {
            if (!(value instanceof output_2.Message)) {
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
    (0, output_1.Type)(() => output_2.Message),
    __metadata("design:type", output_2.Message)
], FacebookMessengerResponse.prototype, "message", void 0);
__decorate([
    (0, output_1.IsEitherValid)({
        keys: ['message', 'sender_action'],
        validate: (value) => {
            if (!(0, output_1.isEnum)(value, SenderActionType)) {
                return '$property must be a valid enum value';
            }
        },
    }),
    __metadata("design:type", String)
], FacebookMessengerResponse.prototype, "sender_action", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(NotificationType),
    __metadata("design:type", String)
], FacebookMessengerResponse.prototype, "notification_type", void 0);
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(MessageTag),
    __metadata("design:type", String)
], FacebookMessengerResponse.prototype, "tag", void 0);
exports.FacebookMessengerResponse = FacebookMessengerResponse;
//# sourceMappingURL=FacebookMessengerResponse.js.map