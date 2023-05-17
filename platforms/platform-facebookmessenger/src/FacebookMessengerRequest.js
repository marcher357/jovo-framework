"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessengerRequest = void 0;
const framework_1 = require("@jovotech/framework");
const _1 = require(".");
class FacebookMessengerRequest extends framework_1.JovoRequest {
    constructor() {
        super(...arguments);
        this.$type = 'facebook';
    }
    getLocale() {
        return;
    }
    setLocale(locale) {
        this.locale = locale;
    }
    getIntent() {
        return;
    }
    setIntent(intent) {
        this.nlu = { intentName: intent };
    }
    getEntities() {
        return;
    }
    getInputType() {
        var _a, _b, _c;
        const postbackPayload = (_c = (_b = (_a = this.messaging) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.postback) === null || _c === void 0 ? void 0 : _c.payload;
        if (postbackPayload === _1.FACEBOOK_LAUNCH_PAYLOAD) {
            return framework_1.InputType.Launch;
        }
        return framework_1.InputType.Text;
    }
    getInputText() {
        var _a, _b, _c, _d, _e, _f;
        return ((_c = (_b = (_a = this.messaging) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.text) || ((_f = (_e = (_d = this.messaging) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.postback) === null || _f === void 0 ? void 0 : _f.title);
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
        return undefined;
    }
    isNewSession() {
        return undefined;
    }
    getDeviceCapabilities() {
        return;
    }
    getUserId() {
        return undefined;
    }
    setUserId() {
        return;
    }
}
exports.FacebookMessengerRequest = FacebookMessengerRequest;
//# sourceMappingURL=FacebookMessengerRequest.js.map