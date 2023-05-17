"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAssistantRequest = void 0;
const framework_1 = require("@jovotech/framework");
const enums_1 = require("./enums");
const GoogleAssistantDevice_1 = require("./GoogleAssistantDevice");
const output_1 = require("./output");
class GoogleAssistantRequest extends framework_1.JovoRequest {
    getLocale() {
        var _a;
        return (_a = this.user) === null || _a === void 0 ? void 0 : _a.locale;
    }
    setLocale(locale) {
        if (!this.user) {
            return;
        }
        this.user.locale = locale;
    }
    getIntent() {
        var _a;
        return (_a = this.intent) === null || _a === void 0 ? void 0 : _a.name;
    }
    setIntent(intent) {
        if (!this.intent) {
            this.intent = { name: intent, params: {} };
        }
        this.intent.name = intent;
    }
    getEntities() {
        var _a, _b;
        const entities = {};
        for (const param in (_a = this.intent) === null || _a === void 0 ? void 0 : _a.params) {
            if ((_b = this.intent) === null || _b === void 0 ? void 0 : _b.params.hasOwnProperty(param)) {
                entities[param] = {
                    native: this.intent.params[param],
                    id: this.intent.params[param].resolved,
                    value: this.intent.params[param].original,
                    resolved: this.intent.params[param].resolved,
                };
            }
        }
        return entities;
    }
    getInputType() {
        var _a, _b, _c, _d;
        if (((_a = this.intent) === null || _a === void 0 ? void 0 : _a.name) === enums_1.GoogleAssistantSystemIntent.Main &&
            !Object.keys(((_b = this.session) === null || _b === void 0 ? void 0 : _b.params) || {}).length) {
            return framework_1.InputType.Launch;
        }
        if (((_c = this.intent) === null || _c === void 0 ? void 0 : _c.name) === enums_1.GoogleAssistantSystemIntent.Cancel) {
            return framework_1.InputType.End;
        }
        if ((_d = this.intent) === null || _d === void 0 ? void 0 : _d.params.AccountLinkingSlot) {
            return enums_1.GoogleAssistantSystemInputType.ON_SIGN_IN;
        }
        return undefined;
    }
    getInputText() {
        var _a;
        return (_a = this.intent) === null || _a === void 0 ? void 0 : _a.query;
    }
    getInputAudio() {
        return;
    }
    getSessionData() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.params;
    }
    setSessionData(data) {
        if (!this.session) {
            return;
        }
        this.session.params = data;
    }
    getSessionId() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.id;
    }
    isNewSession() {
        const sessionData = this.getSessionData();
        return !sessionData || Object.keys(sessionData).length === 0;
    }
    getDeviceCapabilities() {
        var _a;
        const supportedCapabilities = (_a = this.device) === null || _a === void 0 ? void 0 : _a.capabilities;
        if (!supportedCapabilities) {
            return;
        }
        const capabilities = [];
        if (supportedCapabilities === null || supportedCapabilities === void 0 ? void 0 : supportedCapabilities.includes(output_1.Capability.Speech)) {
            capabilities.push(framework_1.Capability.Audio);
        }
        if (supportedCapabilities === null || supportedCapabilities === void 0 ? void 0 : supportedCapabilities.includes(output_1.Capability.LongFormAudio)) {
            capabilities.push(framework_1.Capability.LongformAudio);
        }
        if (supportedCapabilities === null || supportedCapabilities === void 0 ? void 0 : supportedCapabilities.includes(output_1.Capability.RichResponse)) {
            capabilities.push(framework_1.Capability.Screen);
        }
        if (supportedCapabilities === null || supportedCapabilities === void 0 ? void 0 : supportedCapabilities.includes(output_1.Capability.WebLink)) {
            capabilities.push(GoogleAssistantDevice_1.GoogleAssistantCapability.WebLink);
        }
        if (supportedCapabilities === null || supportedCapabilities === void 0 ? void 0 : supportedCapabilities.includes(output_1.Capability.InteractiveCanvas)) {
            capabilities.push(GoogleAssistantDevice_1.GoogleAssistantCapability.InteractiveCanvas);
        }
        return capabilities;
    }
    getUserId() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.userId;
    }
    setUserId(userId) {
        var _a;
        if (!((_a = this.user) === null || _a === void 0 ? void 0 : _a.params)) {
            return;
        }
        this.user.params.userId = userId;
    }
}
exports.GoogleAssistantRequest = GoogleAssistantRequest;
//# sourceMappingURL=GoogleAssistantRequest.js.map