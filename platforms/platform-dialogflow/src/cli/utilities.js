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
exports.getGcloudAccessToken = exports.activateServiceAccount = void 0;
const cli_core_1 = require("@jovotech/cli-core");
__exportStar(require("./interfaces"), exports);
__exportStar(require("./constants"), exports);
async function activateServiceAccount(keyFilePath) {
    try {
        await (0, cli_core_1.execAsync)(`gcloud auth activate-service-account --key-file ${keyFilePath}`);
    }
    catch (error) {
        // gcloud CLI writes output to stderr, so we have to parse the output message in this catch() block.
        if (error.stderr.includes('Activated service account')) {
            return;
        }
        throw new cli_core_1.JovoCliError({
            message: 'Could not activate your service account.',
            module: 'DialogflowCli',
            details: error.stderr,
        });
    }
}
exports.activateServiceAccount = activateServiceAccount;
async function getGcloudAccessToken() {
    try {
        const { stdout } = await (0, cli_core_1.execAsync)('gcloud auth print-access-token');
        if (!stdout) {
            throw new Error();
        }
        return stdout.trim();
    }
    catch (error) {
        throw new cli_core_1.JovoCliError({
            message: 'Authorization failed.',
            module: 'DialogflowCli',
            details: error.stderr,
        });
    }
}
exports.getGcloudAccessToken = getGcloudAccessToken;
//# sourceMappingURL=utilities.js.map