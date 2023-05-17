"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoSession = void 0;
const index_1 = require("./index");
class JovoSession {
    constructor(data) {
        var _a;
        this.id = data === null || data === void 0 ? void 0 : data.id;
        this.data = (data === null || data === void 0 ? void 0 : data.data) || {};
        this.state = data === null || data === void 0 ? void 0 : data.state;
        this.isNew = (_a = data === null || data === void 0 ? void 0 : data.isNew) !== null && _a !== void 0 ? _a : true;
        this.updatedAt = new Date();
        this.createdAt = this.isNew
            ? new Date()
            : (data === null || data === void 0 ? void 0 : data.createdAt)
                ? new Date(data.createdAt)
                : new Date();
    }
    getPersistableData() {
        return {
            id: this.id,
            data: this.data,
            state: this.state,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
    setPersistableData(data, config) {
        if (!data) {
            return this;
        }
        const expiresAfterSeconds = (typeof config === 'object' ? config.expiresAfterSeconds : undefined) ||
            index_1.DEFAULT_SESSION_EXPIRES_AFTER_SECONDS;
        const expiresAfterMilliseconds = expiresAfterSeconds * 1000;
        const timeDifferenceInMilliseconds = new Date().getTime() - new Date(data.updatedAt).getTime();
        const isExpired = timeDifferenceInMilliseconds > expiresAfterMilliseconds;
        if (isExpired) {
            return this;
        }
        // the loaded session can not be new because it was loaded from the database and is not expired
        this.isNew = false;
        this.id = (data === null || data === void 0 ? void 0 : data.id) || this.id;
        this.data = (data === null || data === void 0 ? void 0 : data.data) || this.data;
        this.state = (data === null || data === void 0 ? void 0 : data.state) || this.state;
        this.updatedAt = new Date();
        this.createdAt = (data === null || data === void 0 ? void 0 : data.createdAt) ? new Date(data.createdAt) : new Date();
        return this;
    }
}
exports.JovoSession = JovoSession;
//# sourceMappingURL=JovoSession.js.map