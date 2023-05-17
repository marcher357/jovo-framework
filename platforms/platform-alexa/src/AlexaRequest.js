"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaRequest = exports.ALEXA_REQUEST_TYPE_TO_INPUT_TYPE_MAP = void 0;
const framework_1 = require("@jovotech/framework");
const AlexaDevice_1 = require("./AlexaDevice");
const constants_1 = require("./constants");
const output_1 = require("./output");
const lodash_set_1 = __importDefault(require("lodash.set"));
exports.ALEXA_REQUEST_TYPE_TO_INPUT_TYPE_MAP = {
    'LaunchRequest': framework_1.InputType.Launch,
    'IntentRequest': framework_1.InputType.Intent,
    'SessionEndedRequest': framework_1.InputType.End,
    'System.ExceptionEncountered': framework_1.InputType.Error, // @see https://www.jovo.tech/docs/input#error
};
class AlexaRequest extends framework_1.JovoRequest {
    getLocale() {
        var _a;
        return (_a = this.request) === null || _a === void 0 ? void 0 : _a.locale;
    }
    // @see https://www.jovo.tech/marketplace/platform-alexa/output#apl-user-events
    getAplUserEventArg(key) {
        var _a;
        if (((_a = this === null || this === void 0 ? void 0 : this.request) === null || _a === void 0 ? void 0 : _a.type) === 'Alexa.Presentation.APL.UserEvent') {
            const args = (this === null || this === void 0 ? void 0 : this.request.arguments) || [];
            for (let i = 0; i < args.length; i++) {
                const argument = args[i];
                if (typeof argument === 'object' && constants_1.SUPPORTED_APL_ARGUMENT_TYPES.includes(argument === null || argument === void 0 ? void 0 : argument.type)) {
                    if (argument[key]) {
                        return argument[key];
                    }
                }
            }
        }
    }
    getIntent() {
        var _a, _b;
        return this.getAplUserEventArg('intent') || ((_b = (_a = this.request) === null || _a === void 0 ? void 0 : _a.intent) === null || _b === void 0 ? void 0 : _b.name);
    }
    setIntent(intent) {
        if (!this.request) {
            return;
        }
        if (!this.request.intent) {
            this.request.intent = { name: intent };
        }
        else {
            this.request.intent.name = intent;
        }
    }
    getEntities() {
        var _a, _b, _c, _d;
        const slots = Object.assign(Object.assign({}, (((_b = (_a = this.request) === null || _a === void 0 ? void 0 : _a.intent) === null || _b === void 0 ? void 0 : _b.slots) || {})), (((_d = (_c = this.request) === null || _c === void 0 ? void 0 : _c.apiRequest) === null || _d === void 0 ? void 0 : _d.slots) || {}));
        const aplEntities = this.getAplUserEventArg('entities');
        if (aplEntities) {
            return aplEntities;
        }
        if (!Object.keys(slots).length) {
            return;
        }
        return Object.keys(slots).reduce((entityMap, slotKey) => {
            const entity = {
                native: slots[slotKey],
            };
            if (slots[slotKey].value) {
                entity.value = slots[slotKey].value;
                entity.resolved = slots[slotKey].value;
            }
            const modifyEntityByAuthorityResolutions = (resolutionsPerAuthority) => {
                resolutionsPerAuthority.forEach((resolutionPerAuthority) => {
                    const { name, id } = resolutionPerAuthority.values[0].value;
                    entity.resolved = name;
                    entity.id = id || name;
                });
            };
            // check static entities first
            modifyEntityByAuthorityResolutions(this.getStaticEntityMatches(slotKey));
            // dynamic entities have a higher priority
            modifyEntityByAuthorityResolutions(this.getDynamicEntityMatches(slotKey));
            entityMap[slotKey] = entity;
            return entityMap;
        }, {});
    }
    getStaticEntityMatches(slotKey) {
        return this.getEntityResolutions(slotKey, constants_1.STATIC_ENTITY_MATCHES_PREFIX);
    }
    getDynamicEntityMatches(slotKey) {
        return this.getEntityResolutions(slotKey, constants_1.DYNAMIC_ENTITY_MATCHES_PREFIX);
    }
    getEntityResolutions(slotKey, prefix) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return [
            ...(((_e = (_d = (_c = (_b = (_a = this.request) === null || _a === void 0 ? void 0 : _a.intent) === null || _b === void 0 ? void 0 : _b.slots) === null || _c === void 0 ? void 0 : _c[slotKey]) === null || _d === void 0 ? void 0 : _d.resolutions) === null || _e === void 0 ? void 0 : _e.resolutionsPerAuthority) || []),
            ...(((_k = (_j = (_h = (_g = (_f = this.request) === null || _f === void 0 ? void 0 : _f.apiRequest) === null || _g === void 0 ? void 0 : _g.slots) === null || _h === void 0 ? void 0 : _h[slotKey]) === null || _j === void 0 ? void 0 : _j.resolutions) === null || _k === void 0 ? void 0 : _k.resolutionsPerAuthority) || []),
        ].filter((authorityResolution) => authorityResolution.status.code === output_1.ResolutionPerAuthorityStatusCode.SuccessMatch &&
            authorityResolution.authority.startsWith(prefix));
    }
    getInputType() {
        var _a, _b;
        // Transform requests that include an intent to Intent request types
        // Example: 'Alexa.Presentation.APL.UserEvent' requests with APL arguments, @see https://www.jovo.tech/marketplace/platform-alexa/output#apl-user-events
        // Don't convert CanFulfillIntentRequest requests, @see https://github.com/jovotech/jovo-framework/issues/1426
        if (this.getIntent() && ((_a = this.request) === null || _a === void 0 ? void 0 : _a.type) !== 'CanFulfillIntentRequest') {
            return framework_1.InputType.Intent;
        }
        return ((_b = this.request) === null || _b === void 0 ? void 0 : _b.type)
            ? exports.ALEXA_REQUEST_TYPE_TO_INPUT_TYPE_MAP[this.request.type] || this.request.type
            : undefined;
    }
    setLocale(locale) {
        if (!this.request) {
            return;
        }
        this.request.locale = locale;
    }
    getInputText() {
        return;
    }
    getInputAudio() {
        return;
    }
    getSessionData() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.attributes;
    }
    setSessionData(session) {
        if (!this.session) {
            return;
        }
        this.session.attributes = session;
    }
    getSessionId() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.sessionId;
    }
    isNewSession() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.new;
    }
    // platform-specific
    isAplSupported() {
        var _a, _b, _c, _d;
        return !!((_d = (_c = (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.System) === null || _b === void 0 ? void 0 : _b.device) === null || _c === void 0 ? void 0 : _c.supportedInterfaces) === null || _d === void 0 ? void 0 : _d['Alexa.Presentation.APL']);
    }
    getUserId() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.System) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId;
    }
    setUserId(userId) {
        if (!this.session) {
            // TODO: What to do here?
            return;
        }
        if (!this.session.user) {
            this.session.user = { userId: userId, accessToken: '', permissions: { consentToken: '' } };
        }
        this.session.user.userId = userId;
        (0, lodash_set_1.default)(this, 'context.System.user.userId', userId);
    }
    getApiEndpoint() {
        return this.context.System.apiEndpoint;
    }
    getApiAccessToken() {
        return this.context.System.apiAccessToken;
    }
    getUnit() {
        return this.context.System.unit;
    }
    getDeviceCapabilities() {
        var _a, _b, _c;
        const supportedInterfaces = (_c = (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.System) === null || _b === void 0 ? void 0 : _b.device) === null || _c === void 0 ? void 0 : _c.supportedInterfaces;
        if (!supportedInterfaces) {
            return;
        }
        const capabilities = [framework_1.Capability.Audio];
        if (supportedInterfaces.AudioPlayer) {
            capabilities.push(framework_1.Capability.LongformAudio);
        }
        if (supportedInterfaces['Alexa.Presentation.APL']) {
            capabilities.push(framework_1.Capability.Screen, AlexaDevice_1.AlexaCapability.Apl);
        }
        return capabilities;
    }
    getDeviceId() {
        return this.context.System.device.deviceId;
    }
}
exports.AlexaRequest = AlexaRequest;
//# sourceMappingURL=AlexaRequest.js.map