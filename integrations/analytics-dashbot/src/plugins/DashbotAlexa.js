"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotAlexa = void 0;
const DashbotAnalyticsPlugin_1 = require("./DashbotAnalyticsPlugin");
class DashbotAlexa extends DashbotAnalyticsPlugin_1.DashbotAnalyticsPlugin {
    constructor() {
        super(...arguments);
        this.id = 'alexa';
    }
    async trackRequest(jovo, url) {
        const requestLog = { event: jovo.$request };
        await this.sendDashbotRequest(url, requestLog);
    }
    async trackResponse(jovo, url) {
        const responseLog = {
            event: jovo.$request,
            response: jovo.$response,
        };
        await this.sendDashbotRequest(url, responseLog);
    }
    canHandle(platform) {
        return platform.name === 'AlexaPlatform';
    }
}
exports.DashbotAlexa = DashbotAlexa;
//# sourceMappingURL=DashbotAlexa.js.map