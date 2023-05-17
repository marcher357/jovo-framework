"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessengerOutputTemplateConverterStrategy = void 0;
const output_1 = require("@jovotech/output");
const FacebookMessengerResponse_1 = require("../FacebookMessengerResponse");
const constants_1 = require("./constants");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
class FacebookMessengerOutputTemplateConverterStrategy extends output_1.MultipleResponsesOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.responseClass = FacebookMessengerResponse_1.FacebookMessengerResponse;
        this.platformName = 'facebookMessenger';
    }
    // maybe we need more context here, like index of template
    sanitizeOutput(output, index) {
        const pathPrefix = index ? `[${index}]` : '';
        if (output.message) {
            output.message = this.sanitizeMessage(output.message, `${pathPrefix}.message`);
        }
        if (output.carousel) {
            output.carousel = this.sanitizeCarousel(output.carousel, `${pathPrefix}.carousel`);
        }
        if (output.quickReplies) {
            output.quickReplies = this.sanitizeQuickReplies(output.quickReplies, `${pathPrefix}.quickReplies`);
        }
        return output;
    }
    sanitizeMessage(message, path, maxLength = constants_1.MESSAGE_TEXT_MAX_LENGTH, offset) {
        return super.sanitizeMessage(message, path, maxLength, offset);
    }
    sanitizeCarousel(carousel, path, minSize = constants_1.GENERIC_TEMPLATE_MIN_SIZE, maxSize = constants_1.GENERIC_TEMPLATE_MAX_SIZE) {
        return super.sanitizeCarousel(carousel, path, minSize, maxSize);
    }
    sanitizeQuickReplies(quickReplies, path, maxSize = constants_1.QUICK_REPLIES_MAX_SIZE, maxLength = constants_1.QUICK_REPLY_TITLE_MAX_LENGTH) {
        return super.sanitizeQuickReplies(quickReplies, path, maxSize, maxLength);
    }
    convertOutput(output) {
        var _a;
        const makeResponse = (message) => this.normalizeResponse({
            messaging_type: FacebookMessengerResponse_1.MessagingType.Response,
            recipient: {
                id: '',
            },
            message,
        });
        const responses = [];
        const addMessageToResponses = (message) => {
            responses.push(makeResponse(message));
        };
        const message = output.message;
        if (message) {
            addMessageToResponses((0, utilities_1.convertMessageToFacebookMessengerMessage)(message));
        }
        const card = output.card;
        if (card === null || card === void 0 ? void 0 : card.toFacebookMessengerMessage) {
            addMessageToResponses(card.toFacebookMessengerMessage());
        }
        const carousel = output.carousel;
        if (carousel === null || carousel === void 0 ? void 0 : carousel.toFacebookMessengerMessage) {
            addMessageToResponses(carousel.toFacebookMessengerMessage());
        }
        const platformOutput = (_a = output.platforms) === null || _a === void 0 ? void 0 : _a[this.platformName];
        if (platformOutput === null || platformOutput === void 0 ? void 0 : platformOutput.template) {
            addMessageToResponses({
                attachment: {
                    type: models_1.MessageAttachmentType.Template,
                    payload: platformOutput.template,
                },
            });
        }
        if (platformOutput === null || platformOutput === void 0 ? void 0 : platformOutput.nativeResponse) {
            // TODO determine what to do with nativeResponse
        }
        const quickReplies = output.quickReplies;
        const nativeQuickReplies = platformOutput === null || platformOutput === void 0 ? void 0 : platformOutput.nativeQuickReplies;
        if ((quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) || (nativeQuickReplies === null || nativeQuickReplies === void 0 ? void 0 : nativeQuickReplies.length)) {
            const lastResponseWithMessage = responses
                .slice()
                .reverse()
                .find((response) => !!response.message);
            if (lastResponseWithMessage === null || lastResponseWithMessage === void 0 ? void 0 : lastResponseWithMessage.message) {
                lastResponseWithMessage.message.quick_replies = [];
                if (nativeQuickReplies === null || nativeQuickReplies === void 0 ? void 0 : nativeQuickReplies.length) {
                    lastResponseWithMessage.message.quick_replies.push(...nativeQuickReplies);
                }
                if (quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) {
                    lastResponseWithMessage.message.quick_replies.push(...quickReplies.map(this.convertQuickReplyToFacebookMessengerQuickReply));
                }
            }
        }
        return responses.length === 1 ? responses[0] : responses;
    }
    convertResponse(response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const output = {};
        if ((_a = response.message) === null || _a === void 0 ? void 0 : _a.text) {
            output.message = response.message.text;
        }
        else if (((_c = (_b = response.message) === null || _b === void 0 ? void 0 : _b.attachment) === null || _c === void 0 ? void 0 : _c.type) === models_1.MessageAttachmentType.Template &&
            ((_f = (_e = (_d = response.message) === null || _d === void 0 ? void 0 : _d.attachment) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.template_type) === models_1.TemplateType.Generic) {
            const genericTemplate = (_h = (_g = response.message) === null || _g === void 0 ? void 0 : _g.attachment) === null || _h === void 0 ? void 0 : _h.payload;
            if (((_j = genericTemplate.elements) === null || _j === void 0 ? void 0 : _j.length) === 1 && genericTemplate.elements[0].toCard) {
                output.card = genericTemplate.elements[0].toCard();
            }
            else if ((((_k = genericTemplate.elements) === null || _k === void 0 ? void 0 : _k.length) || 0) > 1 && genericTemplate.toCarousel) {
                output.carousel = genericTemplate.toCarousel();
            }
        }
        if ((_m = (_l = response.message) === null || _l === void 0 ? void 0 : _l.quick_replies) === null || _m === void 0 ? void 0 : _m.length) {
            output.quickReplies = response.message.quick_replies
                .filter((quickReply) => quickReply.content_type === models_1.QuickReplyContentType.Text)
                .map((quickReply) => quickReply.toQuickReply());
        }
        return output;
    }
    convertQuickReplyToFacebookMessengerQuickReply(quickReply) {
        var _a;
        return typeof quickReply === 'string'
            ? { content_type: models_1.QuickReplyContentType.Text, title: quickReply, payload: quickReply }
            : ((_a = quickReply.toFacebookQuickReply) === null || _a === void 0 ? void 0 : _a.call(quickReply)) || {
                content_type: models_1.QuickReplyContentType.Text,
                title: quickReply.text,
                payload: quickReply.value || quickReply.text,
            };
    }
}
exports.FacebookMessengerOutputTemplateConverterStrategy = FacebookMessengerOutputTemplateConverterStrategy;
//# sourceMappingURL=FacebookMessengerOutputTemplateConverterStrategy.js.map