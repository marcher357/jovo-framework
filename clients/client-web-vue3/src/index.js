"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_web_1 = require("@jovotech/client-web");
const vue_1 = require("vue");
__exportStar(require("@jovotech/client-web"), exports);
const plugin = {
    install: (app, config) => {
        if (!(config === null || config === void 0 ? void 0 : config.endpointUrl)) {
            throw new Error(`At least the 'endpointUrl' option has to be set in order to use the JovoWebClientPlugin. `);
        }
        // Issue: It seems like it is impossible to attach reactive data to jovo from a plugin.
        // This means that compared to the vue2-variant, this will require workarounds to use properties of the client.
        // Another solution would be to simply add the client to the data of the Root-component and provide it from there.
        // This would fix the reactivity issue.
        app.config.globalProperties.$client = (0, vue_1.reactive)(new client_web_1.Client(config.url, config.client));
    },
};
exports.default = plugin;
//# sourceMappingURL=index.js.map