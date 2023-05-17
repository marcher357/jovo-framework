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
exports.getGactionsError = exports.checkForGactionsCli = void 0;
const cli_core_1 = require("@jovotech/cli-core");
__exportStar(require("./constants"), exports);
__exportStar(require("./interfaces"), exports);
async function checkForGactionsCli() {
    try {
        await (0, cli_core_1.execAsync)('gactions version');
    }
    catch (err) {
        throw new cli_core_1.JovoCliError({
            message: 'Jovo requires gactions CLI.',
            module: 'GoogleAssistantCli',
            learnMore: 'Install the gactions CLI following this guide: ' +
                'https://developers.google.com/assistant/conversational/quickstart#install_the_gactions_command-line_tool',
        });
    }
}
exports.checkForGactionsCli = checkForGactionsCli;
/**
 * Tries to parse the provided error message for standard errors.
 * @param errorMessage - Error message.
 */
function getGactionsError(errorMessage) {
    var _a;
    // ToDo: Check for different errors.
    if (errorMessage.includes('command requires authentication')) {
        return new cli_core_1.JovoCliError({
            message: 'Missing authentication.',
            module: 'GoogleAssistantCli',
            hint: 'Try to run "gactions login" first.',
        });
    }
    const errorToken = 'Server did not return HTTP 200.';
    if (errorMessage.includes(errorToken)) {
        const { error } = JSON.parse(errorMessage.substring(errorMessage.indexOf(errorToken) + errorToken.length));
        return new cli_core_1.JovoCliError({
            message: error.message,
            module: 'GoogleAssistantCli',
            details: (_a = error.details[0].fieldViolations) === null || _a === void 0 ? void 0 : _a[0].description,
        });
    }
    return new cli_core_1.JovoCliError({ message: errorMessage, module: 'GoogleAssistantCli' });
}
exports.getGactionsError = getGactionsError;
//# sourceMappingURL=utilities.js.map