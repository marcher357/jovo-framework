"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const uuid_1 = require("uuid");
class Store {
    static getDefaultConfig() {
        return {
            storageKey: 'JOVO_WEB_CLIENT_DATA',
            shouldPersistSession: true,
            sessionExpirationInSeconds: 1800,
        };
    }
    constructor(config) {
        this.data = {};
        const defaultConfig = Store.getDefaultConfig();
        this.config = config ? (0, lodash_defaultsdeep_1.default)(config, defaultConfig) : defaultConfig;
        this.load();
    }
    resetSession() {
        this.sessionData = this.newSessionData();
    }
    load() {
        var _a;
        const rawPersistedData = localStorage.getItem(this.config.storageKey) || '{}';
        const persistedData = JSON.parse(rawPersistedData);
        const defaultUserData = {
            id: (0, uuid_1.v4)(),
            data: {},
        };
        this.userData = (0, lodash_defaultsdeep_1.default)(persistedData.user, defaultUserData);
        const defaultSessionData = this.newSessionData();
        const sessionExpirationDate = ((_a = persistedData.session) === null || _a === void 0 ? void 0 : _a.lastUpdatedAt)
            ? this.config.sessionExpirationInSeconds * 1000 +
                new Date(persistedData.session.updatedAt).getTime()
            : undefined;
        const isExpired = sessionExpirationDate && sessionExpirationDate < new Date().getTime();
        this.sessionData = isExpired
            ? defaultSessionData
            : (0, lodash_defaultsdeep_1.default)(persistedData.session, defaultSessionData);
    }
    save() {
        const persistedData = {
            user: this.userData,
            session: this.config.shouldPersistSession ? this.sessionData : undefined,
        };
        localStorage.setItem(this.config.storageKey, JSON.stringify(persistedData));
    }
    newSessionData() {
        return {
            id: (0, uuid_1.v4)(),
            data: {},
            state: [],
            isNew: true,
            updatedAt: new Date(),
        };
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map