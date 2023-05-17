"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const cli_core_1 = require("@jovotech/cli-core");
class Plugin extends cli_core_1.JovoCliPlugin {
    constructor() {
        super(...arguments);
        this.id = 'testPlugin';
        this.type = 'platform';
        this.platformDirectory = 'test';
    }
    get name() {
        return '';
    }
    get platformPath() {
        return '';
    }
    get defaultConfig() {
        return {};
    }
    get skillPackagePath() {
        return '';
    }
    get skillJsonPath() {
        return '';
    }
    get modelsPath() {
        return '';
    }
    get modelPath() {
        return '';
    }
    get accountLinkingPath() {
        return '';
    }
    get askConfigFolderPath() {
        return '';
    }
    get askConfigPath() {
        return '';
    }
    get askResourcesPath() {
        return '';
    }
    getModelPath() {
        return '';
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=Plugin.js.map