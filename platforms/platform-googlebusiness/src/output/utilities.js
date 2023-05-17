"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.augmentModelPrototypes = exports.convertMessageToGoogleBusinessText = void 0;
const common_1 = require("@jovotech/common");
const output_1 = require("@jovotech/output");
const models_1 = require("./models");
function convertMessageToGoogleBusinessText(message) {
    return common_1.SsmlUtilities.removeSSML(typeof message === 'string' ? message : message.text || message.speech);
}
exports.convertMessageToGoogleBusinessText = convertMessageToGoogleBusinessText;
function augmentModelPrototypes() {
    output_1.Card.prototype.toGoogleBusinessCardContent = function () {
        const cardContent = {};
        if (this.title) {
            cardContent.title = this.title;
        }
        if (this.content || this.subtitle) {
            cardContent.description = this.content || this.subtitle;
        }
        if (this.imageUrl) {
            cardContent.media = {
                height: models_1.MediaHeight.Medium,
                contentInfo: {
                    fileUrl: this.imageUrl,
                    altText: this.imageAlt || this.title,
                },
            };
        }
        if (this.suggestions) {
            cardContent.suggestions = this.suggestions;
        }
        return cardContent;
    };
    output_1.Card.prototype.toGoogleBusinessCard = function () {
        return {
            cardContent: this.toGoogleBusinessCardContent(),
        };
    };
    output_1.Card.prototype.toGoogleBusinessRichCard = function () {
        return {
            standaloneCard: this.toGoogleBusinessCard(),
        };
    };
    output_1.Carousel.prototype.toGoogleBusinessCarousel = function () {
        return {
            cardWidth: models_1.CardWidth.Medium,
            cardContents: this.items.map((card) => card.toGoogleBusinessCardContent()),
        };
    };
    output_1.Carousel.prototype.toGoogleBusinessRichCard = function () {
        if (this.items.length === 1) {
            return {
                standaloneCard: {
                    cardContent: this.items[0].toGoogleBusinessCardContent(),
                },
            };
        }
        return {
            carouselCard: this.toGoogleBusinessCarousel(),
        };
    };
    output_1.Message.prototype.toGoogleBusinessText = function () {
        return convertMessageToGoogleBusinessText(this);
    };
    output_1.QuickReply.prototype.toGoogleBusinessSuggestion = function () {
        return {
            reply: {
                text: this.text,
                postbackData: this.value || this.text,
            },
        };
    };
}
exports.augmentModelPrototypes = augmentModelPrototypes;
//# sourceMappingURL=utilities.js.map