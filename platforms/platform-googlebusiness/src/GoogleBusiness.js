"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusiness = void 0;
const framework_1 = require("@jovotech/framework");
const constants_1 = require("./constants");
class GoogleBusiness extends framework_1.AsyncJovo {
    get conversationId() {
        return this.$request.conversationId;
    }
    get serviceAccount() {
        var _a, _b;
        return (_b = (_a = this.$config.plugin) === null || _a === void 0 ? void 0 : _a.GoogleBusinessPlatform) === null || _b === void 0 ? void 0 : _b.serviceAccount;
    }
    sendResponse(response) {
        if (!this.conversationId) {
            throw new framework_1.JovoError({
                message: 'Can not send message to GoogleBusiness due to a missing or empty conversation-id.',
            });
        }
        if (!this.serviceAccount) {
            throw new framework_1.JovoError({
                message: 'Can not send message to GoogleBusiness due to a missing or invalid service-account.',
            });
        }
        const url = `${constants_1.GOOGLE_BUSINESS_API_BASE_URL}/${constants_1.LATEST_GOOGLE_BUSINESS_API_VERSION}/conversations/${this.conversationId}/messages`;
        return this.$platform.jwtClient.request({
            url,
            method: 'POST',
            data: response,
        });
    }
}
exports.GoogleBusiness = GoogleBusiness;
//# sourceMappingURL=GoogleBusiness.js.map