"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotFacebook = void 0;
const DashbotAnalyticsPlugin_1 = require("./DashbotAnalyticsPlugin");
class DashbotFacebook extends DashbotAnalyticsPlugin_1.DashbotAnalyticsPlugin {
    constructor() {
        super(...arguments);
        this.id = 'facebook';
    }
    async trackRequest(jovo, url) {
        const requestLog = {
            object: 'page',
            entry: [jovo.$request],
        };
        await this.sendDashbotRequest(url, requestLog);
    }
    async trackResponse(jovo, url) {
        var _a;
        for (const response of (jovo.$response || [])) {
            const responseLog = {
                qs: {
                    access_token: (_a = jovo.$plugins.FacebookMessengerPlatform) === null || _a === void 0 ? void 0 : _a.config.pageAccessToken,
                },
                uri: 'https://graph.facebook.com/v10.0/me/messages',
                json: response,
                method: 'POST',
            };
            await this.sendDashbotRequest(url, responseLog);
        }
    }
    canHandle(platform) {
        return platform.name === 'FacebookMessengerPlatform' || platform.name === 'InstagramPlatform';
    }
}
exports.DashbotFacebook = DashbotFacebook;
//# sourceMappingURL=DashbotFacebook.js.map