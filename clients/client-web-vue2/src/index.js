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
__exportStar(require("@jovotech/client-web"), exports);
const plugin = {
    install: (vue, configOrClient) => {
        if (!(configOrClient instanceof client_web_1.Client)) {
            if (!(configOrClient === null || configOrClient === void 0 ? void 0 : configOrClient.endpointUrl)) {
                throw new Error(`At least the 'endpointUrl' option has to be set in order to use the JovoWebClientPlugin. `);
            }
            configOrClient = new client_web_1.Client(configOrClient.endpointUrl, configOrClient.config);
        }
        // make the client reactive
        vue.prototype.$client = vue.observable(configOrClient);
    },
};
exports.default = plugin;
//# sourceMappingURL=index.js.map