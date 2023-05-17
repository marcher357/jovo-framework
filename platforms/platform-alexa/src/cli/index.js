"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaCli = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("./constants");
const BuildHook_1 = require("./hooks/BuildHook");
const DeployHook_1 = require("./hooks/DeployHook");
const GetHook_1 = require("./hooks/GetHook");
const NewHook_1 = require("./hooks/NewHook");
class AlexaCli extends cli_core_1.JovoCliPlugin {
    constructor(config) {
        super(config);
        // Convert boolean value of this.config.conversations to object to handle it unified across hooks
        if (typeof this.config.conversations === 'boolean') {
            const { conversations: defaultConversationsConfig } = this.getDefaultConfig();
            this.config.conversations = Object.assign(Object.assign({}, defaultConversationsConfig), { enabled: this.config.conversations });
        }
    }
    get id() {
        return 'alexa';
    }
    get type() {
        return 'platform';
    }
    get platformDirectory() {
        return `${this.type}.${this.id}`;
    }
    getDefaultConfig() {
        return {
            conversations: {
                enabled: false,
                // ! Since getDefaultConfig() is called before this.id is assigned, we need to set it manually
                directory: (0, path_1.join)('resources', 'alexa', 'conversations'),
                sessionStartDelegationStrategy: {
                    target: 'skill',
                },
                acdlDirectory: 'acdl',
                responsesDirectory: 'responses',
                skipValidation: false,
            },
        };
    }
    async getInitConfig() {
        const initConfig = {};
        // Since this.getInitConfig() is called when this plugin is added to a new
        // Jovo project, we can add external bundle dependencies here
        const packageJsonPath = (0, path_1.resolve)((0, path_1.join)(this.$cli.projectPath, this.$context.projectName, 'package.json'));
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageJson = require(packageJsonPath);
        packageJson.scripts.bundle = `${packageJson.scripts.bundle} --external:@alexa/*`;
        (0, fs_1.writeFileSync)(packageJsonPath, JSON.stringify(packageJson, null, 2));
        // Check for invalid locales and provide a default locale map.
        for (const locale of this.$context.locales) {
            if (!constants_1.SupportedLocales.includes(locale)) {
                // Prompt user for alternative locale.
                cli_core_1.Log.spacer();
                const { locales } = await (0, cli_core_1.promptSupportedLocales)(locale, 'Alexa', constants_1.SupportedLocales);
                if (!locales.length) {
                    continue;
                }
                if (!initConfig.locales) {
                    initConfig.locales = {};
                }
                initConfig.locales[locale] = locales;
            }
        }
        return initConfig;
    }
    getHooks() {
        return [BuildHook_1.BuildHook, GetHook_1.GetHook, DeployHook_1.DeployHook, NewHook_1.NewHook];
    }
    /**
     * The base path to platform's build folder
     */
    get platformPath() {
        return (0, path_1.join)(this.$cli.project.getBuildPath(), this.platformDirectory);
    }
    get resourcesDirectory() {
        return (0, path_1.join)('resources', this.id);
    }
    /**
     * The path to Alexa skill package folder
     */
    get skillPackagePath() {
        return (0, path_1.join)(this.platformPath, 'skill-package');
    }
    /**
     * The path to the skill.json file
     */
    get skillJsonPath() {
        return (0, path_1.join)(this.skillPackagePath, 'skill.json');
    }
    get modelsPath() {
        return (0, path_1.join)(this.skillPackagePath, 'interactionModels', 'custom');
    }
    get accountLinkingPath() {
        return (0, path_1.join)(this.skillPackagePath, 'accountLinking.json');
    }
    get askConfigFolderPath() {
        return (0, path_1.join)(this.platformPath, '.ask');
    }
    get askConfigPath() {
        return (0, path_1.join)(this.askConfigFolderPath, 'ask-states.json');
    }
    get askResourcesPath() {
        return (0, path_1.join)(this.platformPath, 'ask-resources.json');
    }
    get conversationsDirectory() {
        return (0, path_1.join)(this.skillPackagePath, 'conversations');
    }
    get responseDirectory() {
        return (0, path_1.join)(this.skillPackagePath, 'response');
    }
    getModelPath(locale) {
        return (0, path_1.join)(this.modelsPath, `${locale}.json`);
    }
}
exports.AlexaCli = AlexaCli;
//# sourceMappingURL=index.js.map