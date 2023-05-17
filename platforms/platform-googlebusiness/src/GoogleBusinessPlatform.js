"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusinessPlatform = void 0;
const framework_1 = require("@jovotech/framework");
const google_auth_library_1 = require("google-auth-library");
const uuid_1 = require("uuid");
const GoogleBusiness_1 = require("./GoogleBusiness");
const GoogleBusinessDevice_1 = require("./GoogleBusinessDevice");
const GoogleBusinessRequest_1 = require("./GoogleBusinessRequest");
const GoogleBusinessRequestBuilder_1 = require("./GoogleBusinessRequestBuilder");
const GoogleBusinessUser_1 = require("./GoogleBusinessUser");
const output_1 = require("./output");
class GoogleBusinessPlatform extends framework_1.Platform {
    constructor(config) {
        super(config);
        this.id = 'googleBusiness';
        this.outputTemplateConverterStrategy = new output_1.GoogleBusinessOutputTemplateConverterStrategy();
        this.requestClass = GoogleBusinessRequest_1.GoogleBusinessRequest;
        this.jovoClass = GoogleBusiness_1.GoogleBusiness;
        this.userClass = GoogleBusinessUser_1.GoogleBusinessUser;
        this.deviceClass = GoogleBusinessDevice_1.GoogleBusinessDevice;
        this.requestBuilder = GoogleBusinessRequestBuilder_1.GoogleBusinessRequestBuilder;
        this.jwtClient = new google_auth_library_1.JWT({
            email: this.config.serviceAccount.client_email,
            key: this.config.serviceAccount.private_key,
            scopes: ['https://www.googleapis.com/auth/businessmessages'],
        });
    }
    getDefaultConfig() {
        return Object.assign({}, this.getInitConfig());
    }
    getInitConfig() {
        return {
            serviceAccount: {},
        };
    }
    mount(parent) {
        super.mount(parent);
        // Hook into parent's middleware in order to be able to call this first and skip before other plugins are called.
        parent.middlewareCollection.use('before.request.start', (jovo) => {
            return this.beforeRequestStart(jovo);
        });
        this.middlewareCollection.use('request.start', (jovo) => {
            return this.enableDatabaseSessionStorage(jovo, this.config.session);
        });
        // Hook into parent's middleware after loading the session data from the database.
        parent.middlewareCollection.use('after.request.end', (jovo) => {
            return this.handlePotentialDuplicateMessage(jovo);
        });
    }
    isRequestRelated(request) {
        return request.agent && request.conversationId && request.requestId;
    }
    isResponseRelated(response) {
        return response.messageId && response.representative;
    }
    finalizeResponse(response, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    googleBusiness) {
        if (Array.isArray(response)) {
            response.forEach((responseItem) => {
                responseItem.messageId = (0, uuid_1.v4)();
            });
        }
        else {
            response.messageId = (0, uuid_1.v4)();
        }
        return response;
    }
    async handlePotentialDuplicateMessage(jovo) {
        var _a, _b, _c, _d, _e;
        if (!jovo.$googleBusiness) {
            return;
        }
        const messageId = ((_a = jovo.$googleBusiness.$request.message) === null || _a === void 0 ? void 0 : _a.messageId) ||
            ((_e = (_d = (_c = (_b = jovo.$googleBusiness.$request.suggestionResponse) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.match) === null || _d === void 0 ? void 0 : _d.call(_c, /messages[/](.*)/)) === null || _e === void 0 ? void 0 : _e[1]);
        if (!messageId) {
            return;
        }
        const processedMessages = jovo.$session.data._GOOGLE_BUSINESS_PROCESSED_MESSAGES_ || [];
        // message was handled already
        if (processedMessages.includes(messageId)) {
            jovo.$handleRequest.stopMiddlewareExecution();
            return jovo.$handleRequest.server.setResponse({});
        }
        processedMessages.push(messageId);
        jovo.$session.data._GOOGLE_BUSINESS_PROCESSED_MESSAGES_ = processedMessages;
        if (!jovo.$user.id) {
            return;
        }
        const dbPlugins = Object.values(jovo.$handleRequest.plugins).filter((plugin) => plugin instanceof framework_1.DbPlugin);
        // Immediately save the data into the database, so that other simultaneous or delayed requests can already check if the message is being handled or was handled already.
        // If some time-consuming API calls were made during the handling, the saving of the processed message would only take place after those calls which could cause a delay.
        // This delay could then cause the persisting to happen after other requests have already checked if the message was handled.
        return Promise.all(dbPlugins.map((dbPlugin) => {
            return dbPlugin.saveData(jovo.$user.id, jovo);
        }));
    }
    beforeRequestStart(jovo) {
        var _a, _b, _c, _d;
        // if the request is a typing-indicator-request or a receipt-request, just ignore it and send 200 to not get it sent multiple times
        if (((_b = (_a = jovo.$googleBusiness) === null || _a === void 0 ? void 0 : _a.$request) === null || _b === void 0 ? void 0 : _b.userStatus) || ((_d = (_c = jovo.$googleBusiness) === null || _c === void 0 ? void 0 : _c.$request) === null || _d === void 0 ? void 0 : _d.receipts)) {
            jovo.$response = {};
            jovo.$handleRequest.stopMiddlewareExecution();
        }
    }
}
exports.GoogleBusinessPlatform = GoogleBusinessPlatform;
//# sourceMappingURL=GoogleBusinessPlatform.js.map