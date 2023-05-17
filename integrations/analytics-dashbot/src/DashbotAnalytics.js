"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbotAnalytics = void 0;
const framework_1 = require("@jovotech/framework");
const url_1 = require("url");
const DashbotAlexa_1 = require("./plugins/DashbotAlexa");
const DashbotFacebook_1 = require("./plugins/DashbotFacebook");
const DashbotGoogleAssistant_1 = require("./plugins/DashbotGoogleAssistant");
const DashbotUniversal_1 = require("./plugins/DashbotUniversal");
const utilities_1 = require("./utilities");
class DashbotAnalytics extends framework_1.AnalyticsPlugin {
    constructor(config) {
        super(config);
        // Since DashbotUniversal tracks for every platform, it needs to sit at the last position
        // in this.plugins, so a platform-specific plugin can be found, but still disabled.
        this.plugins = [
            DashbotAlexa_1.DashbotAlexa,
            DashbotGoogleAssistant_1.DashbotGoogleAssistant,
            DashbotFacebook_1.DashbotFacebook,
            DashbotUniversal_1.DashbotUniversal,
        ];
    }
    mount(parent) {
        const HandlingPlugin = this.plugins.find((Plugin) => Plugin.prototype.canHandle(parent));
        if (!HandlingPlugin || this.config.enabled === false) {
            return;
        }
        this.initializedPlugin = new HandlingPlugin();
        super.mount(parent);
    }
    getDefaultConfig() {
        return Object.assign({}, this.getInitConfig());
    }
    getInitConfig() {
        return {
            apiKey: '<YOUR-API-KEY>',
        };
    }
    async trackRequest(jovo) {
        const url = new url_1.URL(utilities_1.DASHBOT_BASE_URL);
        url.searchParams.append('type', 'incoming');
        url.searchParams.append('platform', this.initializedPlugin.id);
        url.searchParams.append('apiKey', this.config.apiKey);
        await this.initializedPlugin.trackRequest(jovo, url.href);
    }
    async trackResponse(jovo) {
        const url = new url_1.URL(utilities_1.DASHBOT_BASE_URL);
        url.searchParams.append('type', 'outgoing');
        url.searchParams.append('platform', this.initializedPlugin.id);
        url.searchParams.append('apiKey', this.config.apiKey);
        await this.initializedPlugin.trackResponse(jovo, url.href);
    }
}
exports.DashbotAnalytics = DashbotAnalytics;
//# sourceMappingURL=DashbotAnalytics.js.map