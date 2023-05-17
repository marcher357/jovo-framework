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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHook = void 0;
const acdl_1 = require("@alexa/acdl");
const cli_core_1 = require("@jovotech/cli-core");
const fs_1 = require("fs");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const DefaultFiles_json_1 = __importDefault(require("../DefaultFiles.json"));
const smapi = __importStar(require("../smapi"));
const utilities_1 = require("../utilities");
const AlexaHook_1 = require("./AlexaHook");
class GetHook extends AlexaHook_1.AlexaHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.get:platform': [
                this.checkForPlatform.bind(this),
                utilities_1.checkForAskCli,
                this.updatePluginContext.bind(this),
                this.checkForCleanGet.bind(this),
                this.checkForExistingPlatformFiles.bind(this),
                this.checkForPlatformsFolder.bind(this),
            ],
            'get:platform': [this.get.bind(this)],
        };
    }
    /**
     * Add platform-specific CLI options, including flags and args.
     * @param context - Context providing an access point to command flags and args.
     */
    addCliOptions(context) {
        if (context.command !== 'get:platform') {
            return;
        }
        context.flags['ask-profile'] = cli_core_1.flags.string({
            description: 'Name of used ASK profile',
        });
        context.flags['skill-id'] = cli_core_1.flags.string({ char: 's', description: 'Alexa Skill ID' });
        context.flags['skill-stage'] = cli_core_1.flags.string({
            description: 'Alexa Skill Stage',
            options: ['development', 'live', 'certification'],
            default: 'development',
        });
    }
    /**
     * Checks if the currently selected platform matches this CLI plugin.
     */
    checkForPlatform() {
        // Check if this plugin should be used or not.
        if (!this.$context.platforms.includes(this.$plugin.id)) {
            this.uninstall();
        }
    }
    /**
     * Updates the current plugin context with platform-specific values.
     */
    async updatePluginContext() {
        super.updatePluginContext();
        this.$context.alexa.askProfile =
            this.$context.flags['ask-profile'] ||
                this.$plugin.config.askProfile ||
                (await this.getAskProfile()) ||
                'default';
        this.$context.alexa.skillId =
            this.$context.flags['skill-id'] ||
                (0, lodash_get_1.default)(this.$plugin.config, `[".ask/"]["ask-states.json"].profiles.${this.$context.alexa.askProfile || 'default'}.skillId`) ||
                (0, lodash_get_1.default)(this.$plugin.config, 'skillId');
        this.$context.alexa.skillStage = this.$context.flags['skill-stage'];
    }
    /**
     * Checks if --clean has been set and deletes the platform folder accordingly
     */
    checkForCleanGet() {
        // If --clean has been set, delete the respective platform folders before building
        if (this.$context.flags.clean) {
            (0, cli_core_1.deleteFolderRecursive)(this.$plugin.platformPath);
        }
    }
    /**
     * Checks if platform-specific files already exist and prompts for overwriting them.
     */
    async checkForExistingPlatformFiles() {
        if ((0, fs_1.existsSync)(this.$plugin.skillPackagePath)) {
            const answer = await (0, cli_core_1.promptOverwrite)('Found existing Alexa skill package. How to proceed?');
            if (answer.overwrite === cli_core_1.ANSWER_CANCEL) {
                this.uninstall();
            }
            (0, cli_core_1.deleteFolderRecursive)(this.$plugin.skillPackagePath);
            cli_core_1.Log.spacer();
        }
    }
    /**
     * Checks if the platform folder for the current plugin exists
     */
    checkForPlatformsFolder() {
        if (!(0, fs_1.existsSync)(this.$plugin.platformPath)) {
            (0, fs_1.mkdirSync)(this.$plugin.platformPath);
        }
    }
    /**
     * Fetches platform-specific models from the Alexa Skills Console.
     */
    async get() {
        // If no skill id and thus no specified project can be found, try to prompt for one.
        if (!this.$context.alexa.skillId) {
            let skills = { skills: [] };
            const getSkillListTask = new cli_core_1.Task(`${cli_core_1.MAGNIFYING_GLASS} Getting a list of all your skills`);
            const searchTask = new cli_core_1.Task('Searching', async () => {
                skills = await smapi.listSkills(this.$context.alexa.askProfile);
            });
            getSkillListTask.add(searchTask);
            await getSkillListTask.run();
            cli_core_1.Log.spacer();
            const list = (0, utilities_1.prepareSkillList)(skills);
            try {
                const { skill } = await (0, utilities_1.promptListForAlexaSkill)(list);
                cli_core_1.Log.spacer();
                this.$context.alexa.skillId = skill.skillId;
                this.$context.alexa.skillStage = skill.stage;
            }
            catch (error) {
                return;
            }
        }
        const getTask = new cli_core_1.Task(`${cli_core_1.DOWNLOAD} Getting Alexa skill project ${(0, cli_core_1.printAskProfile)(this.$context.alexa.askProfile)}`);
        const exportTask = new cli_core_1.Task('Exporting skill package', async () => {
            await smapi.exportSkillPackage(this.$context.alexa.skillId, this.$context.alexa.skillStage, this.$plugin.platformPath, this.$context.alexa.askProfile);
        });
        getTask.add(exportTask);
        if (this.$context.alexa.isACSkill) {
            const decompileTask = new cli_core_1.Task('Decompiling ACDL files', async () => {
                if (!(0, fs_1.existsSync)(this.$plugin.conversationsDirectory)) {
                    return;
                }
                const projectConfig = await (0, acdl_1.loadProjectConfig)(this.$plugin.platformPath, this.$context.alexa.askProfile);
                const project = await (0, acdl_1.loadProject)(projectConfig);
                await (0, acdl_1.decompileProject)(project);
            });
            getTask.add(decompileTask);
        }
        // Create ask-resources.json
        if (!(0, fs_1.existsSync)(this.$plugin.askResourcesPath)) {
            const askResources = (0, lodash_get_1.default)(DefaultFiles_json_1.default, 'ask-resources.json');
            (0, lodash_set_1.default)(askResources, `profiles.${this.$context.alexa.askProfile || 'default'}`, {
                skillMetadata: {
                    src: './skill-package',
                },
            });
            (0, fs_1.writeFileSync)(this.$plugin.askResourcesPath, JSON.stringify(askResources, null, 2));
        }
        // Set skill ID and generate .ask/ask-states.json if it does not yet exist
        this.setSkillId(this.$context.alexa.skillId);
        await getTask.run();
    }
}
exports.GetHook = GetHook;
//# sourceMappingURL=GetHook.js.map