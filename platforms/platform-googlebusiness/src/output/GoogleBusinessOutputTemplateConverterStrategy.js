"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusinessOutputTemplateConverterStrategy = void 0;
const output_1 = require("@jovotech/output");
const GoogleBusinessResponse_1 = require("../GoogleBusinessResponse");
const constants_1 = require("./constants");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
class GoogleBusinessOutputTemplateConverterStrategy extends output_1.MultipleResponsesOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.responseClass = GoogleBusinessResponse_1.GoogleBusinessResponse;
        this.platformName = 'googleBusiness';
    }
    sanitizeOutput(output, index) {
        const pathPrefix = index ? `[${index}]` : '';
        if (output.card) {
            output.card = this.sanitizeCard(output.card, `${pathPrefix}.card`);
        }
        if (output.carousel) {
            output.carousel = this.sanitizeCarousel(output.carousel, `${pathPrefix}.carousel`);
        }
        if (output.quickReplies) {
            output.quickReplies = this.sanitizeQuickReplies(output.quickReplies, `${pathPrefix}.quickReplies`);
        }
        return output;
    }
    sanitizeCard(card, path) {
        if (!this.shouldSanitize('trimStrings')) {
            return card;
        }
        if (card.title.length > constants_1.CARD_CONTENT_TITLE_MAX_LENGTH) {
            card.title = card.title.slice(0, constants_1.CARD_CONTENT_TITLE_MAX_LENGTH);
            this.logStringTrimWarning(`${path}.title`, constants_1.CARD_CONTENT_TITLE_MAX_LENGTH);
        }
        if (card.content && card.content.length > constants_1.CARD_CONTENT_DESCRIPTION_MAX_LENGTH) {
            card.content = card.content.slice(0, constants_1.CARD_CONTENT_DESCRIPTION_MAX_LENGTH);
            this.logStringTrimWarning(`${path}.content`, constants_1.CARD_CONTENT_DESCRIPTION_MAX_LENGTH);
        }
        return card;
    }
    sanitizeQuickReplies(quickReplies, path, maxSize = constants_1.SUGGESTIONS_MAX_SIZE, maxLength = constants_1.SUGGESTION_TEXT_MAX_LENGTH) {
        return super.sanitizeQuickReplies(quickReplies, path, maxSize, maxLength);
    }
    sanitizeCarousel(carousel, path, minSize = constants_1.CAROUSEL_MIN_SIZE, maxSize = constants_1.CAROUSEL_MAX_SIZE) {
        return super.sanitizeCarousel(carousel, path, minSize, maxSize);
    }
    convertOutput(output) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const getResponseBase = () => this.normalizeResponse({
            messageId: '',
            representative: {
                representativeType: models_1.RepresentativeType.Bot,
            },
        });
        const responses = [];
        const addResponse = (key, content) => {
            const newResult = getResponseBase();
            newResult[key] = content;
            responses.push(newResult);
        };
        const message = output.message;
        if (message) {
            addResponse('text', (0, utilities_1.convertMessageToGoogleBusinessText)(message));
        }
        const card = output.card;
        if (card === null || card === void 0 ? void 0 : card.toGoogleBusinessRichCard) {
            addResponse('richCard', card.toGoogleBusinessRichCard());
        }
        const carousel = output.carousel;
        if (carousel === null || carousel === void 0 ? void 0 : carousel.toGoogleBusinessRichCard) {
            addResponse('richCard', carousel.toGoogleBusinessRichCard());
        }
        const image = (_b = (_a = output.platforms) === null || _a === void 0 ? void 0 : _a.googleBusiness) === null || _b === void 0 ? void 0 : _b.image;
        if (image) {
            addResponse('image', image);
        }
        if ((_d = (_c = output.platforms) === null || _c === void 0 ? void 0 : _c.googleBusiness) === null || _d === void 0 ? void 0 : _d.nativeResponse) {
            // TODO determine what to do with nativeResponse!
        }
        const quickReplies = output.quickReplies;
        const suggestions = (_f = (_e = output.platforms) === null || _e === void 0 ? void 0 : _e.googleBusiness) === null || _f === void 0 ? void 0 : _f.suggestions;
        if ((quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) || (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length)) {
            const lastResponseWithContent = responses
                .slice()
                .reverse()
                .find((response) => !!response.text || !!response.richCard);
            if (lastResponseWithContent) {
                lastResponseWithContent.suggestions = [];
                if (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) {
                    lastResponseWithContent.suggestions.push(...suggestions);
                }
                if (quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) {
                    lastResponseWithContent.suggestions.push(...quickReplies.map(this.convertQuickReplyToGoogleBusinessSuggestion));
                }
            }
        }
        const fallback = (_h = (_g = output.platforms) === null || _g === void 0 ? void 0 : _g.googleBusiness) === null || _h === void 0 ? void 0 : _h.fallback;
        // TODO fully determine whether this should be applied to all responses
        if (fallback) {
            responses.forEach((response) => {
                response.fallback = fallback;
            });
        }
        return responses.length === 1 ? responses[0] : responses;
    }
    convertResponse(response) {
        var _a, _b, _c, _d, _e;
        const output = {};
        if (response.text) {
            output.message = response.text;
        }
        if ((_b = (_a = response.richCard) === null || _a === void 0 ? void 0 : _a.standaloneCard) === null || _b === void 0 ? void 0 : _b.toCard) {
            output.card = response.richCard.standaloneCard.toCard();
        }
        if ((_d = (_c = response.richCard) === null || _c === void 0 ? void 0 : _c.carouselCard) === null || _d === void 0 ? void 0 : _d.toCarousel) {
            output.carousel = response.richCard.carouselCard.toCarousel();
        }
        if ((_e = response.suggestions) === null || _e === void 0 ? void 0 : _e.length) {
            output.quickReplies = response.suggestions.map((suggestion) => suggestion.toQuickReply());
        }
        return output;
    }
    convertQuickReplyToGoogleBusinessSuggestion(quickReply) {
        var _a;
        return typeof quickReply === 'string'
            ? { reply: { text: quickReply, postbackData: quickReply } }
            : ((_a = quickReply.toGoogleBusinessSuggestion) === null || _a === void 0 ? void 0 : _a.call(quickReply)) || {
                reply: {
                    text: quickReply.text,
                    postbackData: quickReply.value || quickReply.text,
                },
            };
    }
}
exports.GoogleBusinessOutputTemplateConverterStrategy = GoogleBusinessOutputTemplateConverterStrategy;
//# sourceMappingURL=GoogleBusinessOutputTemplateConverterStrategy.js.map