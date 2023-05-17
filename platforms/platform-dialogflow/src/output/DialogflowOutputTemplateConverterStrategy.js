"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogflowOutputTemplateConverterStrategy = void 0;
const output_1 = require("@jovotech/output");
const DialogflowResponse_1 = require("../DialogflowResponse");
const constants_1 = require("./constants");
const models_1 = require("./models");
const utilities_1 = require("./utilities");
// TODO CHECK: Theoretically, multiple messages are supported in the response, in the future this could be refactored for that.
class DialogflowOutputTemplateConverterStrategy extends output_1.SingleResponseOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.platformName = 'dialogflow';
        this.responseClass = DialogflowResponse_1.DialogflowResponse;
    }
    sanitizeOutput(output) {
        if (output.message) {
            output.message = this.sanitizeMessage(output.message, 'message');
        }
        if (output.quickReplies) {
            output.quickReplies = this.sanitizeQuickReplies(output.quickReplies, 'quickReplies');
        }
        return output;
    }
    sanitizeMessage(message, path, maxLength = constants_1.TEXT_MAX_LENGTH, offset) {
        return super.sanitizeMessage(message, path, maxLength, offset);
    }
    sanitizeQuickReplies(quickReplies, path, maxSize = constants_1.QUICK_REPLIES_MAX_SIZE, maxLength = constants_1.QUICK_REPLY_MAX_LENGTH) {
        return super.sanitizeQuickReplies(quickReplies, path, maxSize, maxLength);
    }
    toResponse(output) {
        var _a, _b, _c;
        const response = this.normalizeResponse({});
        const listen = output.listen;
        if (typeof listen === 'object' && ((_a = listen.entities) === null || _a === void 0 ? void 0 : _a.types)) {
            const entityOverrideMode = listen.entities.mode === output_1.DynamicEntitiesMode.Merge
                ? models_1.EntityOverrideMode.Supplement
                : models_1.EntityOverrideMode.Override;
            response.session_entity_types = Object.keys(listen.entities.types).map((entityName) => this.convertDynamicEntityToSessionEntityType(entityName, listen.entities.types[entityName], entityOverrideMode));
        }
        const message = output.message;
        if (message) {
            if (!response.fulfillment_messages) {
                response.fulfillment_messages = [];
            }
            response.fulfillment_messages.push({
                message: {
                    text: (0, utilities_1.convertMessageToDialogflowText)(message),
                },
            });
        }
        const quickReplies = output.quickReplies;
        if (quickReplies === null || quickReplies === void 0 ? void 0 : quickReplies.length) {
            if (!response.fulfillment_messages) {
                response.fulfillment_messages = [];
            }
            response.fulfillment_messages.push({
                message: {
                    quick_replies: {
                        quick_replies: quickReplies
                            .slice(0, constants_1.QUICK_REPLIES_MAX_SIZE)
                            .map(this.convertQuickReplyToDialogflowQuickReply),
                    },
                },
            });
        }
        const card = output.card;
        if (card) {
            if (!response.fulfillment_messages) {
                response.fulfillment_messages = [];
            }
            response.fulfillment_messages.push({
                message: {
                    card: card.toDialogflowCard(),
                },
            });
        }
        if ((_c = (_b = output.platforms) === null || _b === void 0 ? void 0 : _b.dialogflow) === null || _c === void 0 ? void 0 : _c.nativeResponse) {
            (0, output_1.mergeInstances)(response, output.platforms.dialogflow.nativeResponse);
        }
        return response;
    }
    fromResponse(response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const output = {};
        const messageWithText = (_a = response.fulfillment_messages) === null || _a === void 0 ? void 0 : _a.find((message) => message.message.text);
        if (messageWithText) {
            output.message = (_c = (_b = messageWithText.message.text) === null || _b === void 0 ? void 0 : _b.toMessage) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
        const messageWithQuickReplies = (_d = response.fulfillment_messages) === null || _d === void 0 ? void 0 : _d.find((message) => message.message.quick_replies);
        if ((_g = (_f = (_e = messageWithQuickReplies === null || messageWithQuickReplies === void 0 ? void 0 : messageWithQuickReplies.message) === null || _e === void 0 ? void 0 : _e.quick_replies) === null || _f === void 0 ? void 0 : _f.quick_replies) === null || _g === void 0 ? void 0 : _g.length) {
            output.quickReplies = messageWithQuickReplies.message.quick_replies.quick_replies;
        }
        const messageWithCard = (_h = response.fulfillment_messages) === null || _h === void 0 ? void 0 : _h.find((message) => message.message.card);
        if (messageWithCard) {
            output.card = (_k = (_j = messageWithCard.message.card) === null || _j === void 0 ? void 0 : _j.toCard) === null || _k === void 0 ? void 0 : _k.call(_j);
        }
        if ((_l = response.session_entity_types) === null || _l === void 0 ? void 0 : _l.length) {
            const mode = response.session_entity_types[0].entity_override_mode === models_1.EntityOverrideMode.Supplement
                ? output_1.DynamicEntitiesMode.Merge
                : output_1.DynamicEntitiesMode.Replace;
            output.listen = {
                entities: {
                    mode,
                    types: response.session_entity_types.reduce((map, sessionEntityType) => {
                        map[sessionEntityType.name] =
                            this.convertSessionEntityTypeToDynamicEntity(sessionEntityType);
                        return map;
                    }, {}),
                },
            };
        }
        return output;
    }
    convertQuickReplyToDialogflowQuickReply(quickReply) {
        var _a;
        return typeof quickReply === 'string'
            ? quickReply
            : ((_a = quickReply.toDialogflowQuickReply) === null || _a === void 0 ? void 0 : _a.call(quickReply)) || quickReply.value || quickReply.text;
    }
    convertDynamicEntityToSessionEntityType(entityName, entity, entityOverrideMode) {
        // name usually is a whole path that even includes the session-id, we will have to figure something out for that, but it should not be too complicated.
        return {
            name: entityName,
            entity_override_mode: entityOverrideMode,
            entities: (entity.values || []).map((entityValue) => {
                var _a;
                return ({
                    value: entityValue.id || entityValue.value,
                    // at least one synonym
                    synonyms: [entityValue.value, ...(((_a = entityValue.synonyms) === null || _a === void 0 ? void 0 : _a.slice()) || [])],
                });
            }),
        };
    }
    convertSessionEntityTypeToDynamicEntity(sessionEntityType) {
        return {
            values: sessionEntityType.entities.map((entity) => ({
                id: entity.value,
                value: entity.value,
                synonyms: entity.synonyms.slice(),
            })),
        };
    }
}
exports.DialogflowOutputTemplateConverterStrategy = DialogflowOutputTemplateConverterStrategy;
//# sourceMappingURL=DialogflowOutputTemplateConverterStrategy.js.map