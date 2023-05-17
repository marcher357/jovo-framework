"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotAnalyticsPlugin = void 0;
const framework_1 = require("@jovotech/framework");
class DashbotAnalyticsPlugin {
    async sendDashbotRequest(url, data) {
        try {
            await framework_1.axios.post(url, data);
        }
        catch (error) {
            if (error.isAxiosError) {
                throw new framework_1.JovoError({
                    message: `Request to Dashbot failed: ${error.response.data.errors.join('\n')}`,
                });
            }
            throw new framework_1.JovoError({ message: error.message });
        }
    }
}
exports.DashbotAnalyticsPlugin = DashbotAnalyticsPlugin;
//# sourceMappingURL=DashbotAnalyticsPlugin.js.map