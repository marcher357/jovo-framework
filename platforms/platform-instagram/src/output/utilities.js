"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentModelPrototypes = void 0;
const output_1 = require("@jovotech/output");
function augmentModelPrototypes() {
    output_1.Card.prototype.toInstagramGenericTemplateElement =
        output_1.Card.prototype.toFacebookMessengerGenericTemplateElement;
    output_1.Card.prototype.toInstagramGenericTemplate = output_1.Card.prototype.toFacebookMessengerGenericTemplate;
    output_1.Card.prototype.toInstagramMessage = output_1.Card.prototype.toFacebookMessengerMessage;
    output_1.Carousel.prototype.toInstagramGenericTemplate =
        output_1.Carousel.prototype.toFacebookMessengerGenericTemplate;
    output_1.Carousel.prototype.toInstagramMessage = output_1.Carousel.prototype.toFacebookMessengerMessage;
    output_1.Message.prototype.toInstagramMessage = output_1.Message.prototype.toFacebookMessengerMessage;
    output_1.QuickReply.prototype.toInstagramQuickReply = output_1.QuickReply.prototype.toFacebookQuickReply;
}
exports.augmentModelPrototypes = augmentModelPrototypes;
//# sourceMappingURL=utilities.js.map