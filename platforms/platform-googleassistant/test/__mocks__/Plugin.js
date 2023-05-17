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
    get platformPath() {
        return '';
    }
    get name() {
        return '';
    }
    getDefaultConfig() {
        return { projectId: '', resourcesDirectory: '' };
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=Plugin.js.map