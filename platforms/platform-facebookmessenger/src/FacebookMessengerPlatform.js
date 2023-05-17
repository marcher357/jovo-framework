"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessengerPlatform = void 0;
const framework_1 = require("@jovotech/framework");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const constants_1 = require("./constants");
const FacebookMessenger_1 = require("./FacebookMessenger");
const FacebookMessengerDevice_1 = require("./FacebookMessengerDevice");
const FacebookMessengerRequest_1 = require("./FacebookMessengerRequest");
const FacebookMessengerRequestBuilder_1 = require("./FacebookMessengerRequestBuilder");
const FacebookMessengerUser_1 = require("./FacebookMessengerUser");
const output_1 = require("./output");
class FacebookMessengerPlatform extends framework_1.Platform {
    get apiVersion() {
        return this.config.version || constants_1.LATEST_FACEBOOK_API_VERSION;
    }
    get pageAccessToken() {
        return this.config.pageAccessToken;
    }
    get endpoint() {
        return `${constants_1.FACEBOOK_API_BASE_URL}/${this.apiVersion}/me/messages?access_token=${this.pageAccessToken}`;
    }
    constructor(config) {
        super(config);
        this.id = 'facebookMessenger';
        this.outputTemplateConverterStrategy = new output_1.FacebookMessengerOutputTemplateConverterStrategy();
        this.requestClass = FacebookMessengerRequest_1.FacebookMessengerRequest;
        this.jovoClass = FacebookMessenger_1.FacebookMessenger;
        this.userClass = FacebookMessengerUser_1.FacebookMessengerUser;
        this.deviceClass = FacebookMessengerDevice_1.FacebookMessengerDevice;
        this.requestBuilder = FacebookMessengerRequestBuilder_1.FacebookMessengerRequestBuilder;
    }
    async initialize(parent) {
        if (super.initialize) {
            await super.initialize(parent);
        }
        this.augmentAppHandle();
    }
    mount(parent) {
        super.mount(parent);
        this.middlewareCollection.use('after.request.end', (jovo) => this.enableDatabaseSessionStorage(jovo, this.config.session), this.markAsSeen.bind(this));
        this.middlewareCollection.use('dialogue.start', this.enableTypingIndicator.bind(this));
        this.middlewareCollection.use('dialogue.end', this.disableTypingIndicator.bind(this));
        this.middlewareCollection.use('before.request.start', this.ignoreOwnSenderId.bind(this));
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, this.getInitConfig()), { verifyToken: constants_1.DEFAULT_FACEBOOK_VERIFY_TOKEN, version: constants_1.LATEST_FACEBOOK_API_VERSION, senderActions: {
                markSeen: true,
                typingIndicator: true,
            } });
    }
    getInitConfig() {
        return {
            pageAccessToken: '<YOUR-PAGE-ACCESS-TOKEN>',
        };
    }
    async ignoreOwnSenderId(jovo) {
        var _a, _b, _c, _d, _e;
        const senderId = (_d = (_c = (_b = (_a = jovo.$request) === null || _a === void 0 ? void 0 : _a.messaging) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.sender) === null || _d === void 0 ? void 0 : _d.id;
        const businessAccountId = (_e = jovo.$request) === null || _e === void 0 ? void 0 : _e.id;
        if (senderId && businessAccountId && senderId === businessAccountId) {
            jovo.$handleRequest.stopMiddlewareExecution();
            return jovo.$handleRequest.server.setResponse({});
        }
    }
    isRequestRelated(request) {
        var _a;
        return request.$type === 'facebook' && request.id && request.time && ((_a = request.messaging) === null || _a === void 0 ? void 0 : _a[0]);
    }
    isResponseRelated(response) {
        return response.recipient && response.message;
    }
    finalizeResponse(response, jovo) {
        const senderId = jovo.$user.id;
        if (!senderId) {
            // TODO determine if error is good here
            throw new framework_1.JovoError({
                message: 'Can not finalize response: No sender-id was found.',
                context: {
                    request: jovo.$request,
                },
            });
        }
        if (Array.isArray(response)) {
            response.forEach((responseItem) => {
                responseItem.recipient.id = senderId;
            });
        }
        else {
            response.recipient.id = senderId;
        }
        return response;
    }
    augmentAppHandle() {
        const APP_HANDLE = framework_1.App.prototype.handle;
        const getVerifyTokenFromConfig = function () {
            return this.config.verifyToken;
        }.bind(this);
        framework_1.App.prototype.handle = async function (server) {
            var _a;
            const request = server.getRequestObject();
            const query = server.getQueryParams();
            const verifyMode = query['hub.mode'];
            const verifyChallenge = query['hub.challenge'];
            const verifyToken = query['hub.verify_token'];
            const isFacebookVerifyRequest = (!request || !Object.keys(request).length) && verifyMode && verifyChallenge && verifyToken;
            const isFacebookMessengerRequest = (request === null || request === void 0 ? void 0 : request.object) === 'page' && Array.isArray(request === null || request === void 0 ? void 0 : request.entry) && ((_a = request === null || request === void 0 ? void 0 : request.entry) === null || _a === void 0 ? void 0 : _a.length);
            if (isFacebookVerifyRequest) {
                const configuredVerifyToken = getVerifyTokenFromConfig();
                if (verifyToken === configuredVerifyToken) {
                    return server.setResponse(+verifyChallenge);
                }
                throw new framework_1.JovoError({
                    message: 'The verify-token in the request does not match the configured verify-token.',
                    context: {
                        verifyToken,
                        configuredVerifyToken,
                    },
                });
            }
            else if (isFacebookMessengerRequest) {
                const responses = [];
                const promises = request.entry.map((entry) => {
                    // Set platform origin on request entry
                    entry.$type = 'facebook';
                    const serverCopy = (0, lodash_clonedeep_1.default)(server);
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    serverCopy.setResponse = async (response) => {
                        responses.push(response);
                    };
                    serverCopy.getRequestObject = () => entry;
                    return APP_HANDLE.call(this, serverCopy);
                });
                await Promise.all(promises);
                return server.setResponse(responses);
            }
            else {
                return APP_HANDLE.call(this, server);
            }
        };
    }
    /**
     * Sends data to the Facebook Messenger API
     * @param data - Data to be sent
     */
    async sendData(data) {
        var _a, _b, _c;
        if (!this.pageAccessToken) {
            throw new framework_1.JovoError({
                message: 'Can not send message to Facebook due to a missing or empty page-access-token.',
            });
        }
        try {
            // TODO: AttachmentMessage-support
            return await framework_1.axios.post(this.endpoint, data);
        }
        catch (error) {
            if (error.isAxiosError) {
                throw new framework_1.JovoError({
                    message: `Request to Facebook API failed: ${(_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message}`,
                });
            }
            throw error;
        }
    }
    async markAsSeen(jovo) {
        var _a;
        if (((_a = this.config.senderActions) === null || _a === void 0 ? void 0 : _a.markSeen) === false) {
            return;
        }
        await this.sendSenderAction(jovo, 'mark_seen');
    }
    async enableTypingIndicator(jovo) {
        var _a;
        if (((_a = this.config.senderActions) === null || _a === void 0 ? void 0 : _a.typingIndicator) === false) {
            return;
        }
        await this.sendSenderAction(jovo, 'typing_on');
    }
    async disableTypingIndicator(jovo) {
        var _a;
        if (((_a = this.config.senderActions) === null || _a === void 0 ? void 0 : _a.typingIndicator) === false) {
            return;
        }
        await this.sendSenderAction(jovo, 'typing_off');
    }
    async sendSenderAction(jovo, senderAction) {
        if (jovo.$platform.name !== 'FacebookMessengerPlatform') {
            return;
        }
        await this.sendData({ recipient: { id: jovo.$user.id }, sender_action: senderAction });
    }
}
exports.FacebookMessengerPlatform = FacebookMessengerPlatform;
//# sourceMappingURL=FacebookMessengerPlatform.js.map