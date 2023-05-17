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
exports.MessageContent = exports.Message = exports.Platform = void 0;
const output_1 = require("@jovotech/output");
const IsValidMessageContentObject_1 = require("../decorators/validation/IsValidMessageContentObject");
const Card_1 = require("./message/Card");
const Image_1 = require("./message/Image");
const QuickReplies_1 = require("./message/QuickReplies");
const RbmCarouselCard_1 = require("./message/rbm/RbmCarouselCard");
const RbmStandaloneCard_1 = require("./message/rbm/RbmStandaloneCard");
const RbmText_1 = require("./message/rbm/RbmText");
const TelephonyPlayAudio_1 = require("./message/telephony/TelephonyPlayAudio");
const TelephonySynthesizeSpeech_1 = require("./message/telephony/TelephonySynthesizeSpeech");
const TelephonyTransferCall_1 = require("./message/telephony/TelephonyTransferCall");
const Text_1 = require("./message/Text");
var Platform;
(function (Platform) {
    Platform["Unspecified"] = "PLATFORM_UNSPECIFIED";
    Platform["Facebook"] = "FACEBOOK";
    Platform["Slack"] = "SLACK";
    Platform["Telegram"] = "TELEGRAM";
    Platform["Kik"] = "KIK";
    Platform["Skype"] = "SKYPE";
    Platform["Line"] = "LINE";
    Platform["Viber"] = "VIBER";
    Platform["ActionsOnGoogle"] = "ACTIONS_ON_GOOGLE";
    Platform["Telephony"] = "TELEPHONY";
    Platform["GoogleHangouts"] = "GOOGLE_HANGOUTS";
})(Platform = exports.Platform || (exports.Platform = {}));
class Message {
}
__decorate([
    (0, output_1.IsOptional)(),
    (0, output_1.IsEnum)(Platform),
    __metadata("design:type", String)
], Message.prototype, "platform", void 0);
__decorate([
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Type)(() => MessageContent),
    __metadata("design:type", MessageContent)
], Message.prototype, "message", void 0);
exports.Message = Message;
class MessageContent {
}
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => Text_1.Text),
    __metadata("design:type", Text_1.Text)
], MessageContent.prototype, "text", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => Image_1.Image),
    __metadata("design:type", Image_1.Image)
], MessageContent.prototype, "image", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => QuickReplies_1.QuickReplies),
    __metadata("design:type", QuickReplies_1.QuickReplies)
], MessageContent.prototype, "quick_replies", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => Card_1.Card),
    __metadata("design:type", Card_1.Card)
], MessageContent.prototype, "card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "payload", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "simple_responses", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "basic_card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "suggestions", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "link_out_suggestion", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "list_select", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "carousel_select", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => TelephonyPlayAudio_1.TelephonyPlayAudio),
    __metadata("design:type", TelephonyPlayAudio_1.TelephonyPlayAudio)
], MessageContent.prototype, "telephony_play_audio", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => TelephonySynthesizeSpeech_1.TelephonySynthesizeSpeech),
    __metadata("design:type", TelephonySynthesizeSpeech_1.TelephonySynthesizeSpeech)
], MessageContent.prototype, "telephony_synthesize_speech", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => TelephonyTransferCall_1.TelephonyTransferCall),
    __metadata("design:type", TelephonyTransferCall_1.TelephonyTransferCall)
], MessageContent.prototype, "telephony_transfer_call", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => RbmText_1.RbmText),
    __metadata("design:type", RbmText_1.RbmText)
], MessageContent.prototype, "rbm_text", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => RbmStandaloneCard_1.RbmStandaloneCard),
    __metadata("design:type", RbmStandaloneCard_1.RbmStandaloneCard)
], MessageContent.prototype, "rbm_standalone_rich_card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    (0, output_1.Type)(() => RbmCarouselCard_1.RbmCarouselCard),
    __metadata("design:type", RbmCarouselCard_1.RbmCarouselCard)
], MessageContent.prototype, "rbm_carousel_rich_card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "browse_carousel_card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "table_card", void 0);
__decorate([
    (0, IsValidMessageContentObject_1.IsValidMessageContentObject)(),
    __metadata("design:type", Object)
], MessageContent.prototype, "media_content", void 0);
exports.MessageContent = MessageContent;
//# sourceMappingURL=Message.js.map