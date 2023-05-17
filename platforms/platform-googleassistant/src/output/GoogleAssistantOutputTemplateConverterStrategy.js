"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAssistantOutputTemplateConverterStrategy = void 0;
const common_1 = require("@jovotech/common");
const output_1 = require("@jovotech/output");
const GoogleAssistantResponse_1 = require("../GoogleAssistantResponse");
const constants_1 = require("./constants");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
class GoogleAssistantOutputTemplateConverterStrategy extends output_1.SingleResponseOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.platformName = 'googleAssistant';
        this.responseClass = GoogleAssistantResponse_1.GoogleAssistantResponse;
    }
    // make sure the (content of) message and reprompt always is an object for Google Assistant
    normalizeOutput(output) {
        const makeMessageObj = (message) => {
            return {
                text: common_1.SsmlUtilities.removeSSML(message),
                speech: common_1.SsmlUtilities.toSSML(message),
            };
        };
        const updateMessage = (outputTemplate, key) => {
            const value = outputTemplate[key];
            if (value && typeof value === 'string') {
                outputTemplate[key] = makeMessageObj(value);
            }
            else if (Array.isArray(value)) {
                outputTemplate[key] = value.map((message) => typeof message === 'string' ? makeMessageObj(message) : message);
            }
        };
        if (Array.isArray(output)) {
            output.forEach((outputTemplate) => {
                updateMessage(outputTemplate, 'message');
                updateMessage(outputTemplate, 'reprompt');
            });
        }
        else {
            updateMessage(output, 'message');
            updateMessage(output, 'reprompt');
        }
        return super.normalizeOutput(output);
    }
    sanitizeOutput(output) {
        if (output.message) {
            output.message = this.sanitizeMessage(output.message, 'message');
        }
        if (output.reprompt) {
            output.reprompt = this.sanitizeMessage(output.reprompt, 'reprompt');
        }
        if (output.quickReplies) {
            output.quickReplies = this.sanitizeQuickReplies(output.quickReplies, 'quickReplies');
        }
        if (output.carousel) {
            output.carousel = this.sanitizeCarousel(output.carousel, 'carousel');
        }
        return output;
    }
    sanitizeMessage(message, path, maxLength = {
        text: constants_1.TEXT_MAX_LENGTH,
    }, offset) {
        return super.sanitizeMessage(message, path, maxLength, offset);
    }
    sanitizeQuickReplies(quickReplies, path, maxSize = constants_1.SUGGESTIONS_MAX_SIZE, maxLength = constants_1.SUGGESTION_TITLE_MAX_LENGTH) {
        return super.sanitizeQuickReplies(quickReplies, path, maxSize, maxLength);
    }
    sanitizeCarousel(carousel, path, minSize = constants_1.COLLECTION_MIN_SIZE, maxSize = constants_1.COLLECTION_MAX_SIZE) {
        return super.sanitizeCarousel(carousel, path, minSize, maxSize);
    }
    toResponse(output) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const response = this.normalizeResponse({});
        function getEmptySession() {
            return { id: '', params: {}, languageCode: '' };
        }
        const listen = output.listen;
        if (listen === false) {
            response.scene = {
                name: '',
                slots: {},
                next: {
                    name: 'actions.scene.END_CONVERSATION',
                },
            };
        }
        else if (typeof listen === 'object' && ((_a = listen.entities) === null || _a === void 0 ? void 0 : _a.types)) {
            const typeOverrideMode = listen.entities.mode === output_1.DynamicEntitiesMode.Merge
                ? models_1.TypeOverrideMode.Merge
                : models_1.TypeOverrideMode.Replace;
            if (!response.session) {
                response.session = getEmptySession();
            }
            response.session.typeOverrides = Object.keys(listen.entities.types).map((entityName) => this.convertDynamicEntityToTypeOverride(entityName, listen.entities.types[entityName], typeOverrideMode));
        }
        const message = output.message;
        if (message) {
            if (!response.prompt) {
                response.prompt = {};
            }
            response.prompt.firstSimple = (0, utilities_1.convertMessageToGoogleAssistantSimple)(message);
        }
        const reprompt = output.reprompt;
        if (reprompt) {
            if (!response.session) {
                response.session = getEmptySession();
            }
            const text = typeof reprompt === 'string' ? reprompt : reprompt.text || reprompt.speech;
            response.session.params._GOOGLE_ASSISTANT_REPROMPTS_ = {
                NO_INPUT_1: text,
                NO_INPUT_2: text,
                NO_INPUT_FINAL: text,
            };
        }
        const quickReplies = output.quickReplies;
        if (quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) {
            if (!response.prompt) {
                response.prompt = {};
            }
            response.prompt.suggestions = quickReplies
                .slice(0, 8)
                .map(this.convertQuickReplyToSuggestion);
        }
        const card = output.card;
        if (card) {
            if (!response.prompt) {
                response.prompt = {};
            }
            if (!response.prompt.content) {
                response.prompt.content = {};
            }
            response.prompt.content.card = (_b = card.toGoogleAssistantCard) === null || _b === void 0 ? void 0 : _b.call(card);
        }
        const carousel = output.carousel;
        // Show a regular card if there is a single item in the carousel
        if (((_c = carousel === null || carousel === void 0 ? void 0 : carousel.selection) === null || _c === void 0 ? void 0 : _c.entityType) &&
            ((_d = carousel === null || carousel === void 0 ? void 0 : carousel.selection) === null || _d === void 0 ? void 0 : _d.intent) &&
            carousel.items.length === 1) {
            if (!response.prompt) {
                response.prompt = {};
            }
            if (!response.prompt.content) {
                response.prompt.content = {};
            }
            response.prompt.content.card = (_e = carousel.toGoogleAssistantCard) === null || _e === void 0 ? void 0 : _e.call(carousel);
        }
        // if a carousel exists and selection.entityType is set for it (otherwise carousel can't be displayed)
        if (((_f = carousel === null || carousel === void 0 ? void 0 : carousel.selection) === null || _f === void 0 ? void 0 : _f.entityType) &&
            ((_g = carousel === null || carousel === void 0 ? void 0 : carousel.selection) === null || _g === void 0 ? void 0 : _g.intent) &&
            carousel.items.length > 1) {
            const collectionData = (_h = carousel.toGoogleAssistantCollectionData) === null || _h === void 0 ? void 0 : _h.call(carousel);
            if (collectionData) {
                if (!response.session) {
                    response.session = getEmptySession();
                }
                if (!response.session.typeOverrides) {
                    response.session.typeOverrides = [];
                }
                response.session.typeOverrides.push(collectionData.typeOverride);
                response.session.params._GOOGLE_ASSISTANT_SELECTION_INTENT_ = carousel.selection.intent;
                if (!response.prompt) {
                    response.prompt = {};
                }
                if (!response.prompt.content) {
                    response.prompt.content = {};
                }
                response.prompt.content.collection = collectionData.collection;
            }
        }
        if ((_k = (_j = output.platforms) === null || _j === void 0 ? void 0 : _j.googleAssistant) === null || _k === void 0 ? void 0 : _k.nativeResponse) {
            (0, output_1.mergeInstances)(response, output.platforms.googleAssistant.nativeResponse);
        }
        return response;
    }
    fromResponse(response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const output = {};
        const simple = ((_a = response.prompt) === null || _a === void 0 ? void 0 : _a.firstSimple) || ((_b = response.prompt) === null || _b === void 0 ? void 0 : _b.lastSimple);
        if (simple === null || simple === void 0 ? void 0 : simple.toMessage) {
            output.message = simple.toMessage();
        }
        const reprompts = (_d = (_c = response.session) === null || _c === void 0 ? void 0 : _c.params) === null || _d === void 0 ? void 0 : _d._GOOGLE_ASSISTANT_REPROMPTS_;
        const reprompt = (reprompts === null || reprompts === void 0 ? void 0 : reprompts.NO_INPUT_1) || (reprompts === null || reprompts === void 0 ? void 0 : reprompts.NO_INPUT_2) || (reprompts === null || reprompts === void 0 ? void 0 : reprompts.NO_INPUT_FINAL);
        if (reprompt) {
            output.reprompt = reprompt;
        }
        if (((_f = (_e = response.scene) === null || _e === void 0 ? void 0 : _e.next) === null || _f === void 0 ? void 0 : _f.name) === 'actions.scene.END_CONVERSATION') {
            output.listen = false;
        }
        if ((_h = (_g = response.session) === null || _g === void 0 ? void 0 : _g.typeOverrides) === null || _h === void 0 ? void 0 : _h.length) {
            // only the first should be sufficient
            const mode = response.session.typeOverrides[0].typeOverrideMode === models_1.TypeOverrideMode.Merge
                ? output_1.DynamicEntitiesMode.Merge
                : output_1.DynamicEntitiesMode.Replace;
            output.listen = {
                entities: {
                    mode,
                    types: response.session.typeOverrides.reduce((map, typeOverride) => {
                        map[typeOverride.name] = this.convertTypeOverrideToDynamicEntity(typeOverride);
                        return map;
                    }, {}),
                },
            };
        }
        const suggestions = (_j = response === null || response === void 0 ? void 0 : response.prompt) === null || _j === void 0 ? void 0 : _j.suggestions;
        if (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) {
            output.quickReplies = suggestions.map((suggestion) => {
                return suggestion.toQuickReply();
            });
        }
        const card = (_l = (_k = response.prompt) === null || _k === void 0 ? void 0 : _k.content) === null || _l === void 0 ? void 0 : _l.card;
        if (card === null || card === void 0 ? void 0 : card.toCard) {
            output.card = card.toCard();
        }
        if (((_m = response === null || response === void 0 ? void 0 : response.session) === null || _m === void 0 ? void 0 : _m.typeOverrides) && ((_p = (_o = response === null || response === void 0 ? void 0 : response.prompt) === null || _o === void 0 ? void 0 : _o.content) === null || _p === void 0 ? void 0 : _p.collection)) {
            const carouselTypeOverride = (_r = (_q = response.session) === null || _q === void 0 ? void 0 : _q.typeOverrides) === null || _r === void 0 ? void 0 : _r.find((item) => {
                return item.name === 'prompt_option';
            });
            if (carouselTypeOverride === null || carouselTypeOverride === void 0 ? void 0 : carouselTypeOverride.synonym) {
                output.carousel = {
                    items: carouselTypeOverride.synonym.entries.map((entry) => {
                        var _a, _b, _c, _d;
                        return {
                            title: ((_a = entry.display) === null || _a === void 0 ? void 0 : _a.title) || '',
                            subtitle: (_b = entry.display) === null || _b === void 0 ? void 0 : _b.description,
                            imageUrl: (_d = (_c = entry.display) === null || _c === void 0 ? void 0 : _c.image) === null || _d === void 0 ? void 0 : _d.url,
                            key: entry.name,
                        };
                    }),
                };
            }
        }
        return output;
    }
    convertQuickReplyToSuggestion(quickReply) {
        var _a;
        return typeof quickReply === 'string'
            ? { title: quickReply }
            : ((_a = quickReply.toGoogleAssistantSuggestion) === null || _a === void 0 ? void 0 : _a.call(quickReply)) || {
                title: quickReply.text,
            };
    }
    convertDynamicEntityToTypeOverride(entityName, entity, mode = models_1.TypeOverrideMode.Replace) {
        return {
            name: entityName,
            typeOverrideMode: mode,
            synonym: {
                entries: (entity.values || []).map((entityValue) => {
                    var _a;
                    return ({
                        name: entityValue.id || entityValue.value,
                        synonyms: ((_a = entityValue.synonyms) === null || _a === void 0 ? void 0 : _a.slice()) || [],
                    });
                }),
            },
        };
    }
    convertTypeOverrideToDynamicEntity(typeOverride) {
        var _a;
        return {
            values: (((_a = typeOverride.synonym) === null || _a === void 0 ? void 0 : _a.entries) || []).map((entry) => {
                var _a;
                return ({
                    id: entry.name,
                    value: entry.name,
                    synonyms: (_a = entry.synonyms) === null || _a === void 0 ? void 0 : _a.slice(),
                });
            }),
        };
    }
}
exports.GoogleAssistantOutputTemplateConverterStrategy = GoogleAssistantOutputTemplateConverterStrategy;
//# sourceMappingURL=GoogleAssistantOutputTemplateConverterStrategy.js.map