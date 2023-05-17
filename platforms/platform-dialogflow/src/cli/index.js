"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogflowCli = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const path_1 = require("path");
const BuildHook_1 = require("./hooks/BuildHook");
const DeployHook_1 = require("./hooks/DeployHook");
const GetHook_1 = require("./hooks/GetHook");
class DialogflowCli extends cli_core_1.JovoCliPlugin {
    constructor(config) {
        super(config);
        this.id = 'dialogflow';
        this.type = 'platform';
        this.platformDirectory = 'platform.dialogflow';
    }
    getHooks() {
        return [BuildHook_1.BuildHook, DeployHook_1.DeployHook, GetHook_1.GetHook];
    }
    get platformPath() {
        return (0, path_1.join)(this.$cli.project.getBuildPath(), this.platformDirectory);
    }
    get agentJsonPath() {
        return (0, path_1.join)(this.platformPath, 'agent.json');
    }
    get packageJsonPath() {
        return (0, path_1.join)(this.platformPath, 'package.json');
    }
    get intentsFolderPath() {
        return (0, path_1.join)(this.platformPath, 'intents');
    }
    get entitiesFolderPath() {
        return (0, path_1.join)(this.platformPath, 'entities');
    }
}
exports.DialogflowCli = DialogflowCli;
//# sourceMappingURL=index.js.map