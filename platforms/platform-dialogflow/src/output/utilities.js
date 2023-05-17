"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentModelPrototypes = exports.convertMessageToDialogflowText = void 0;
const common_1 = require("@jovotech/common");
const output_1 = require("@jovotech/output");
function convertMessageToDialogflowText(message) {
    return {
        text: [
            common_1.SsmlUtilities.removeSSML(typeof message === 'string' ? message : message.text || message.speech),
        ],
    };
}
exports.convertMessageToDialogflowText = convertMessageToDialogflowText;
function augmentModelPrototypes() {
    output_1.Card.prototype.toDialogflowCard = function () {
        const card = {};
        if (this.title) {
            card.title = this.title;
        }
        if (this.subtitle) {
            card.subtitle = this.subtitle;
        }
        if (this.imageUrl) {
            card.image_uri = this.imageUrl;
        }
        return card;
    };
    output_1.Message.prototype.toDialogflowText = function () {
        return convertMessageToDialogflowText(this);
    };
    output_1.QuickReply.prototype.toDialogflowQuickReply = function () {
        return this.value || this.text;
    };
}
exports.augmentModelPrototypes = augmentModelPrototypes;
//# sourceMappingURL=utilities.js.map