"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreRequest = void 0;
const framework_1 = require("@jovotech/framework");
class CoreRequest extends framework_1.JovoRequest {
    getLocale() {
        return this.locale;
    }
    getIntent() {
        var _a, _b, _c;
        return ((_a = this.input) === null || _a === void 0 ? void 0 : _a.intent) || ((_c = (_b = this.input) === null || _b === void 0 ? void 0 : _b.nlu) === null || _c === void 0 ? void 0 : _c.intent);
    }
    setIntent(intent) {
        if (!this.input) {
            this.input = {};
        }
        this.input.intent = intent;
    }
    getEntities() {
        var _a, _b, _c;
        return ((_a = this.input) === null || _a === void 0 ? void 0 : _a.entities) || ((_c = (_b = this.input) === null || _b === void 0 ? void 0 : _b.nlu) === null || _c === void 0 ? void 0 : _c.entities);
    }
    getInputType() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.type;
    }
    getInputText() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.text;
    }
    getInputAudio() {
        var _a;
        return (_a = this.input) === null || _a === void 0 ? void 0 : _a.audio;
    }
    getSessionData() {
        var _a;
        return (_a = this.context) === null || _a === void 0 ? void 0 : _a.session;
    }
    getSessionId() {
        var _a, _b;
        return (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.id;
    }
    isNewSession() {
        var _a, _b;
        return (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.isNew;
    }
    getDeviceCapabilities() {
        var _a, _b;
        return (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.device) === null || _b === void 0 ? void 0 : _b.capabilities;
    }
    setLocale(locale) {
        this.locale = locale;
    }
    setSessionData(data) {
        var _a, _b;
        if (!((_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.data)) {
            return;
        }
        this.context.session.data = data;
    }
    getUserId() {
        var _a;
        return (_a = this.context) === null || _a === void 0 ? void 0 : _a.user.id;
    }
    setUserId(userId) {
        if (!this.context) {
            // TODO: What to do here?
            return;
        }
        this.context.user.id = userId;
    }
}
exports.CoreRequest = CoreRequest;
//# sourceMappingURL=CoreRequest.js.map