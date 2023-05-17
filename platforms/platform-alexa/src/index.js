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
exports.AlexaCli = void 0;
const framework_1 = require("@jovotech/framework");
const Alexa_1 = require("./Alexa");
(0, framework_1.registerPlatformSpecificJovoReference)('$alexa', Alexa_1.Alexa);
exports.AlexaCli = process.env.JOVO_CLI_RUNTIME
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('./cli').AlexaCli
    : null;
__exportStar(require("./Alexa"), exports);
__exportStar(require("./AlexaPlatform"), exports);
__exportStar(require("./AlexaRequest"), exports);
__exportStar(require("./AlexaResponse"), exports);
__exportStar(require("./AlexaRequestBuilder"), exports);
__exportStar(require("./AlexaUser"), exports);
__exportStar(require("./AlexaHandles"), exports);
__exportStar(require("./AlexaDevice"), exports);
__exportStar(require("./api"), exports);
__exportStar(require("./api/ReminderApi"), exports);
__exportStar(require("./api/ListApi"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./output"), exports);
//# sourceMappingURL=index.js.map