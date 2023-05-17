"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotGoogleAssistant = void 0;
const DashbotAnalyticsPlugin_1 = require("./DashbotAnalyticsPlugin");
class DashbotGoogleAssistant extends DashbotAnalyticsPlugin_1.DashbotAnalyticsPlugin {
    constructor() {
        super(...arguments);
        this.id = 'google';
    }
    async trackRequest(jovo, url) {
        const requestLog = {
            request_body: {
                fulfillmentLib: '@assistant/conversation',
                request: jovo.$request,
            },
        };
        await this.sendDashbotRequest(url, requestLog);
    }
    async trackResponse(jovo, url) {
        const responseLog = {
            request_body: {
                fulfillmentLib: '@assistant/conversation',
                request: jovo.$request,
            },
            message: {
                fulfillmentLib: '@assistant/conversation',
                // jovo.$response is of type array here, but for GoogleAssistant,
                // only single responses can be sent, hence a conversion is justified
                response: { body: jovo.$response },
            },
        };
        await this.sendDashbotRequest(url, responseLog);
    }
    canHandle(platform) {
        return platform.name === 'GoogleAssistantPlatform';
    }
}
exports.DashbotGoogleAssistant = DashbotGoogleAssistant;
//# sourceMappingURL=DashbotGoogleAssistant.js.map