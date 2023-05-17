"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentModelPrototypes = exports.convertMessageToFacebookMessengerMessage = void 0;
const common_1 = require("@jovotech/common");
const output_1 = require("@jovotech/output");
const constants_1 = require("./constants");
const models_1 = require("./models");
function convertMessageToFacebookMessengerMessage(message) {
    return {
        text: common_1.SsmlUtilities.removeSSML(typeof message === 'string' ? message : message.text || message.speech),
    };
}
exports.convertMessageToFacebookMessengerMessage = convertMessageToFacebookMessengerMessage;
function augmentModelPrototypes() {
    output_1.Card.prototype.toFacebookMessengerGenericTemplateElement = function () {
        const element = {
            title: this.title,
        };
        if (this.subtitle) {
            element.subtitle = this.subtitle;
        }
        if (this.imageUrl) {
            element.image_url = this.imageUrl;
        }
        if (this.defaultAction) {
            element.default_action = this.defaultAction;
        }
        if (this.buttons) {
            element.buttons = this.buttons;
        }
        return element;
    };
    output_1.Card.prototype.toFacebookMessengerGenericTemplate = function () {
        return {
            template_type: models_1.TemplateType.Generic,
            elements: [this.toFacebookMessengerGenericTemplateElement()],
        };
    };
    output_1.Card.prototype.toFacebookMessengerMessage = function () {
        return {
            attachment: {
                type: models_1.MessageAttachmentType.Template,
                payload: this.toFacebookMessengerGenericTemplate(),
            },
        };
    };
    output_1.Carousel.prototype.toFacebookMessengerGenericTemplate = function () {
        return {
            template_type: models_1.TemplateType.Generic,
            elements: this.items
                .slice(0, constants_1.GENERIC_TEMPLATE_MAX_SIZE)
                .map((item) => item.toFacebookMessengerGenericTemplateElement()),
        };
    };
    output_1.Carousel.prototype.toFacebookMessengerMessage = function () {
        return {
            attachment: {
                type: models_1.MessageAttachmentType.Template,
                payload: this.toFacebookMessengerGenericTemplate(),
            },
        };
    };
    output_1.Message.prototype.toFacebookMessengerMessage = function () {
        return convertMessageToFacebookMessengerMessage(this);
    };
    output_1.QuickReply.prototype.toFacebookQuickReply = function () {
        return {
            content_type: models_1.QuickReplyContentType.Text,
            title: this.text,
            payload: this.value || this.text,
        };
    };
}
exports.augmentModelPrototypes = augmentModelPrototypes;
//# sourceMappingURL=utilities.js.map