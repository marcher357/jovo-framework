"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaOutputTemplateConverterStrategy = void 0;
const output_1 = require("@jovotech/output");
const AlexaResponse_1 = require("../AlexaResponse");
const constants_1 = require("./constants");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
class AlexaOutputTemplateConverterStrategy extends output_1.SingleResponseOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.platformName = 'alexa';
        this.responseClass = AlexaResponse_1.AlexaResponse;
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { genericOutputToApl: true });
    }
    sanitizeOutput(output) {
        var _a, _b;
        if (output.message) {
            output.message = this.sanitizeMessage(output.message, 'message');
        }
        if (output.reprompt) {
            output.reprompt = this.sanitizeMessage(output.reprompt, 'reprompt');
        }
        if (output.listen &&
            typeof output.listen === 'object' &&
            ((_b = (_a = output.listen.entities) === null || _a === void 0 ? void 0 : _a.types) === null || _b === void 0 ? void 0 : _b.length)) {
            output.listen.entities = this.sanitizeDynamicEntities(output.listen.entities, 'listen.entities.types');
        }
        return output;
    }
    sanitizeMessage(message, path, maxLength = constants_1.ALEXA_STRING_MAX_LENGTH, offset = constants_1.SSML_OFFSET) {
        return super.sanitizeMessage(message, path, maxLength, offset);
    }
    sanitizeDynamicEntities(dynamicEntities, path, maxSize = constants_1.SLOT_TYPE_VALUES_MAX_SIZE) {
        return super.sanitizeDynamicEntities(dynamicEntities, path, maxSize);
    }
    toResponse(output) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const response = this.normalizeResponse({ version: '1.0', response: {} });
        const addToDirectives = (...directives) => {
            if (!response.response.directives) {
                response.response.directives = [];
            }
            response.response.directives.push(...directives);
        };
        const listen = (_a = output.listen) !== null && _a !== void 0 ? _a : true;
        response.response.shouldEndSession = !listen;
        if (typeof listen === 'object' && listen.entities) {
            const directive = new models_1.DialogUpdateDynamicEntitiesDirective();
            if (listen.entities.mode === output_1.DynamicEntitiesMode.Clear) {
                directive.updateBehavior = models_1.DynamicEntitiesUpdateBehavior.Clear;
            }
            else if (listen.entities.types) {
                directive.updateBehavior = models_1.DynamicEntitiesUpdateBehavior.Replace;
                directive.types = Object.keys(listen.entities.types).map((entityName) => this.convertDynamicEntityToSlotType(entityName, listen.entities.types[entityName]));
            }
            addToDirectives(directive);
        }
        const message = output.message;
        if (message) {
            response.response.outputSpeech = (0, utilities_1.convertMessageToOutputSpeech)(message);
        }
        const reprompt = output.reprompt;
        if (reprompt) {
            response.response.reprompt = {
                outputSpeech: (0, utilities_1.convertMessageToOutputSpeech)(reprompt),
            };
        }
        const card = output.card;
        if (card) {
            if (this.config.genericOutputToApl) {
                addToDirectives((_b = card.toApl) === null || _b === void 0 ? void 0 : _b.call(card, (_c = this.config.aplTemplates) === null || _c === void 0 ? void 0 : _c.card));
            }
            else {
                response.response.card = (_d = card.toAlexaCard) === null || _d === void 0 ? void 0 : _d.call(card);
            }
        }
        const carousel = output.carousel;
        if (carousel && this.config.genericOutputToApl) {
            addToDirectives((_e = carousel.toApl) === null || _e === void 0 ? void 0 : _e.call(carousel, (_f = this.config.aplTemplates) === null || _f === void 0 ? void 0 : _f.carousel));
        }
        const quickReplies = output.quickReplies;
        if (quickReplies && this.config.genericOutputToApl) {
            const directive = (_g = response.response
                .directives) === null || _g === void 0 ? void 0 : _g[0];
            if (directive) {
                if (!((_h = directive.datasources) === null || _h === void 0 ? void 0 : _h.data)) {
                    directive.datasources = {
                        data: {},
                    };
                }
                directive.datasources.data.quickReplies = quickReplies.map((quickReply) => {
                    if (typeof quickReply === 'string') {
                        return { type: 'QuickReply', intent: quickReply };
                    }
                    else {
                        return Object.assign({ type: 'QuickReply' }, quickReply);
                    }
                });
            }
        }
        const list = (_k = (_j = output.platforms) === null || _j === void 0 ? void 0 : _j.alexa) === null || _k === void 0 ? void 0 : _k.list;
        if (list && this.config.genericOutputToApl) {
            addToDirectives((_l = list.toApl) === null || _l === void 0 ? void 0 : _l.call(list));
        }
        if ((_o = (_m = output.platforms) === null || _m === void 0 ? void 0 : _m.alexa) === null || _o === void 0 ? void 0 : _o.nativeResponse) {
            (0, output_1.mergeInstances)(response, output.platforms.alexa.nativeResponse);
        }
        // if the response is an empty response, set shouldEndSession to true, otherwise Alexa returns INVALID_RESPONSE
        const responseProperties = Object.keys(response.response);
        if (responseProperties.length === 1 && responseProperties.includes('shouldEndSession')) {
            response.response.shouldEndSession = true;
        }
        return response;
    }
    fromResponse(response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const output = {};
        // abort early if there is not response-object because all data depends on that
        if (!response.response) {
            return output;
        }
        if ((((_a = response.response.outputSpeech) === null || _a === void 0 ? void 0 : _a.text) || ((_b = response.response.outputSpeech) === null || _b === void 0 ? void 0 : _b.ssml)) &&
            ((_c = response.response.outputSpeech) === null || _c === void 0 ? void 0 : _c.toMessage)) {
            output.message = response.response.outputSpeech.toMessage();
        }
        if ((((_e = (_d = response.response.reprompt) === null || _d === void 0 ? void 0 : _d.outputSpeech) === null || _e === void 0 ? void 0 : _e.text) ||
            ((_g = (_f = response.response.reprompt) === null || _f === void 0 ? void 0 : _f.outputSpeech) === null || _g === void 0 ? void 0 : _g.ssml)) &&
            ((_j = (_h = response.response.reprompt) === null || _h === void 0 ? void 0 : _h.outputSpeech) === null || _j === void 0 ? void 0 : _j.toMessage)) {
            output.reprompt = response.response.reprompt.outputSpeech.toMessage();
        }
        if (typeof response.response.shouldEndSession === 'boolean') {
            output.listen = !response.response.shouldEndSession;
        }
        if ((_k = response.response.card) === null || _k === void 0 ? void 0 : _k.toCard) {
            output.card = response.response.card.toCard();
        }
        // use reversed directives to actually get the last match instead of the first
        const reversedDirectives = (((_l = response.response.directives) === null || _l === void 0 ? void 0 : _l.slice()) || []).reverse();
        const lastDialogUpdateDirective = reversedDirectives.find((directive) => directive.type === 'Dialog.UpdateDynamicEntities');
        if (lastDialogUpdateDirective) {
            output.listen = {
                entities: {
                    mode: lastDialogUpdateDirective.updateBehavior,
                    types: lastDialogUpdateDirective.types.reduce((map, type) => {
                        map[type.name] = this.convertSlotTypeToDynamicEntity(type);
                        return map;
                    }, {}),
                },
            };
        }
        return output;
    }
    convertDynamicEntityToSlotType(name, entity) {
        return {
            name: name,
            values: (entity.values || []).slice(0, constants_1.SLOT_TYPE_VALUES_MAX_SIZE).map((value) => {
                var _a;
                return ({
                    id: value.id,
                    name: {
                        value: value.value,
                        synonyms: (_a = value.synonyms) === null || _a === void 0 ? void 0 : _a.slice(),
                    },
                });
            }),
        };
    }
    convertSlotTypeToDynamicEntity(slotType) {
        return {
            values: slotType.values.map((value) => {
                var _a;
                return ({
                    id: value.id || value.name.value,
                    value: value.name.value,
                    synonyms: (_a = value.name.synonyms) === null || _a === void 0 ? void 0 : _a.slice(),
                });
            }),
        };
    }
}
exports.AlexaOutputTemplateConverterStrategy = AlexaOutputTemplateConverterStrategy;
//# sourceMappingURL=AlexaOutputTemplateConverterStrategy.js.map