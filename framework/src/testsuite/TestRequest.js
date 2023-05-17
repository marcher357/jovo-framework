"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRequest = void 0;
const common_1 = require("@jovotech/common");
const __1 = require("..");
class TestRequest extends __1.JovoRequest {
    constructor() {
        super(...arguments);
        this.isTestRequest = true;
        this.session = new __1.JovoSession({ state: [] });
    }
    getLocale() {
        return this.locale;
    }
    setLocale(locale) {
        this.locale = locale;
    }
    getIntent() {
        return this.intent;
    }
    setIntent(intent) {
        this.intent = intent;
    }
    getEntities() {
        return;
    }
    getInputType() {
        return this.session.isNew ? common_1.InputType.Launch : common_1.InputType.Intent;
    }
    getInputText() {
        return;
    }
    getInputAudio() {
        return;
    }
    setSessionData(data) {
        this.session.data = data;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getSessionData() {
        return this.session.data;
    }
    getSessionId() {
        return this.session.id;
    }
    isNewSession() {
        return this.session.isNew;
    }
    getDeviceCapabilities() {
        return;
    }
}
exports.TestRequest = TestRequest;
//# sourceMappingURL=TestRequest.js.map