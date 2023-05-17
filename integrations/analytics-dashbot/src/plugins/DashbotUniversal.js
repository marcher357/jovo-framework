"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotUniversal = void 0;
const DashbotAnalyticsPlugin_1 = require("./DashbotAnalyticsPlugin");
class DashbotUniversal extends DashbotAnalyticsPlugin_1.DashbotAnalyticsPlugin {
    constructor() {
        super(...arguments);
        this.id = 'universal';
    }
    async trackRequest(jovo, url) {
        const text = jovo.$input.getText() || jovo.$input.getIntentName() || jovo.$input.type || '';
        const requestLog = {
            text,
            userId: jovo.$user.id || '',
            platformJson: jovo.$request,
            sessionId: jovo.$session.id || '',
        };
        const intentName = jovo.$input.getIntentName() || jovo.$input.type;
        const inputs = Object.entries(jovo.$input.entities || []).map(([key, entry]) => ({
            name: key,
            value: (entry === null || entry === void 0 ? void 0 : entry.value) || '',
        }));
        requestLog.intent = { name: intentName, inputs };
        await this.sendDashbotRequest(url, requestLog);
    }
    async trackResponse(jovo, url) {
        for (const output of jovo.$output) {
            // Since we iterate through each output respectively,
            // it's safe to assume that the response is an object
            const strategy = jovo.$platform.outputTemplateConverterStrategy;
            const normalizedOutput = strategy.normalizeOutput(output);
            const response = jovo.$platform.outputTemplateConverterStrategy.toResponse(normalizedOutput);
            const responseLog = {
                text: this.getOutputText(output.message),
                userId: jovo.$user.id || '',
                platformJson: response,
                buttons: this.getButtons(output.quickReplies),
            };
            await this.sendDashbotRequest(url, responseLog);
        }
    }
    canHandle() {
        return true;
    }
    getButtons(quickReplies) {
        if (!quickReplies || !quickReplies.length) {
            return [];
        }
        return quickReplies.map((quickReply) => {
            if (typeof quickReply === 'string') {
                return { label: quickReply };
            }
            else {
                return { label: quickReply.text };
            }
        });
    }
    getOutputText(message) {
        if (!message) {
            return '';
        }
        message = Array.isArray(message) ? this.getRandomElement(message) : message;
        return (typeof message === 'object' ? message.text || message.speech : message) || '';
    }
    getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}
exports.DashbotUniversal = DashbotUniversal;
//# sourceMappingURL=DashbotUniversal.js.map