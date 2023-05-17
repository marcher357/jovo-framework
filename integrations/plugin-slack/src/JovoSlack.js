"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoSlack = void 0;
class JovoSlack {
    constructor(slackPlugin) {
        this.slackPlugin = slackPlugin;
    }
    get config() {
        return this.slackPlugin.config;
    }
    sendError(error, jovo) {
        return this.slackPlugin.sendError(error, jovo);
    }
    sendMessage(message) {
        return this.slackPlugin.sendMessage(message);
    }
}
exports.JovoSlack = JovoSlack;
//# sourceMappingURL=JovoSlack.js.map