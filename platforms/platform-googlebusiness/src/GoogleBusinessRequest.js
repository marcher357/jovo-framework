"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusinessRequest = void 0;
const framework_1 = require("@jovotech/framework");
class GoogleBusinessRequest extends framework_1.JovoRequest {
    getLocale() {
        var _a, _b, _c;
        return ((_a = this.context) === null || _a === void 0 ? void 0 : _a.resolvedLocale) || ((_c = (_b = this.context) === null || _b === void 0 ? void 0 : _b.userInfo) === null || _c === void 0 ? void 0 : _c.userDeviceLocale);
    }
    setLocale(locale) {
        if (!this.context) {
            return;
        }
        this.context.resolvedLocale = locale;
    }
    getIntent() {
        return undefined;
    }
    setIntent() {
        return;
    }
    getEntities() {
        return undefined;
    }
    getInputType() {
        return framework_1.InputType.Text;
    }
    getInputText() {
        var _a, _b, _c;
        return (((_a = this.message) === null || _a === void 0 ? void 0 : _a.text) || ((_b = this.suggestionResponse) === null || _b === void 0 ? void 0 : _b.postbackData) || ((_c = this.suggestionResponse) === null || _c === void 0 ? void 0 : _c.text));
    }
    getInputAudio() {
        return;
    }
    getSessionData() {
        return undefined;
    }
    setSessionData() {
        return;
    }
    getSessionId() {
        return this.conversationId;
    }
    isNewSession() {
        return undefined;
    }
    getDeviceCapabilities() {
        return;
    }
    getUserId() {
        return;
    }
    setUserId() {
        return;
    }
}
exports.GoogleBusinessRequest = GoogleBusinessRequest;
//# sourceMappingURL=GoogleBusinessRequest.js.map