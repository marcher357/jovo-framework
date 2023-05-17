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
exports.DeployHook = void 0;
const acdl_1 = require("@alexa/acdl");
const cli_core_1 = require("@jovotech/cli-core");
const framework_1 = require("@jovotech/framework");
const adm_zip_1 = __importDefault(require("adm-zip"));
const fs_1 = require("fs");
const lodash_get_1 = __importDefault(require("lodash.get"));
const path_1 = require("path");
const smapi = __importStar(require("../smapi"));
const utilities_1 = require("../utilities");
const AlexaHook_1 = require("./AlexaHook");
class DeployHook extends AlexaHook_1.AlexaHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.deploy:platform': [
                this.checkForPlatform.bind(this),
                utilities_1.checkForAskCli,
                this.updatePluginContext.bind(this),
                this.checkForPlatformsFolder.bind(this),
                this.updatePluginContext.bind(this),
            ],
            'deploy:platform': [this.deploy.bind(this)],
        };
    }
    /**
     * Add platform-specific CLI options, including flags and args.
     * @param context - Context providing an access point to command flags and args.
     */
    addCliOptions(context) {
        if (context.command !== 'deploy:platform') {
            return;
        }
        context.flags['ask-profile'] = cli_core_1.flags.string({
            description: 'Name of used ASK profile',
        });
        context.flags['skill-id'] = cli_core_1.flags.string({ char: 's', description: 'Alexa skill ID' });
        context.flags.async = cli_core_1.flags.boolean({ description: 'Deploys Alexa skill asynchronously' });
        context.flags['skip-validation'] = cli_core_1.flags.boolean({
            description: 'Skips validation of Alexa Conversations files',
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
        var _a;
        super.updatePluginContext();
        this.$context.alexa.askProfile =
            this.$context.flags['ask-profile'] ||
                this.$plugin.config.askProfile ||
                (await this.getAskProfile()) ||
                'default';
        this.$context.alexa.skillId = this.$context.flags['skill-id'] || this.getSkillId();
        // TODO: this.$plugin.config.convertsations.enabled enough?
        this.$context.alexa.isACSkill =
            ((_a = this.$plugin.config.conversations) === null || _a === void 0 ? void 0 : _a.enabled) && (0, fs_1.existsSync)(this.$plugin.conversationsDirectory);
    }
    /**
     * Checks if the platform folder for the current plugin exists.
     */
    checkForPlatformsFolder() {
        if (!(0, fs_1.existsSync)(this.$plugin.platformPath)) {
            throw new cli_core_1.JovoCliError({
                message: `Couldn't find the platform folder "${this.$plugin.platformDirectory}/".`,
                module: this.$plugin.name,
                hint: `Please use "jovo build" to create platform-specific files.`,
            });
        }
    }
    /**
     * Deploys platform-specific models to the Alexa Skills Console.
     */
    async deploy() {
        var _a;
        const deployTask = new cli_core_1.Task(`${cli_core_1.ROCKET} Deploying Alexa Skill ${(0, cli_core_1.printStage)(this.$cli.project.stage)}`);
        if (this.$context.alexa.isACSkill) {
            const projectConfig = await (0, acdl_1.loadProjectConfig)(this.$plugin.platformPath, this.$context.alexa.askProfile);
            const project = await (0, acdl_1.loadProject)(projectConfig);
            if (!this.$context.flags['skip-validation'] &&
                !((_a = this.$plugin.config.conversations) === null || _a === void 0 ? void 0 : _a.skipValidation)) {
                const validationTask = new cli_core_1.Task('Validating ACDL files', async () => {
                    const errors = (0, acdl_1.validateProject)(project, true);
                    if (errors.length) {
                        throw new cli_core_1.JovoCliError({
                            message: 'Validation failed for Alexa Conversations',
                            module: this.$plugin.name,
                            hint: (0, utilities_1.getACValidationErrorHint)(errors),
                        });
                    }
                    await (0, cli_core_1.wait)(500);
                });
                deployTask.add(validationTask);
            }
            const compileTask = new cli_core_1.Task('Compiling ACDL files', async () => {
                await (0, acdl_1.bundleProject)(project, { outDir: (0, path_1.join)(this.$plugin.skillPackagePath, 'build') });
                await (0, cli_core_1.wait)(1000);
            });
            deployTask.add(compileTask);
        }
        const uploadTask = new cli_core_1.Task('Uploading skill package', async () => {
            // Deployment is done by compressing the skill-package and importing it into the developer console.
            // Depending on whether the current skill uses Alexa Conversations or not, the location of the
            // skill package changes.
            const zipPath = this.$context.alexa.isACSkill
                ? (0, path_1.join)(this.$plugin.skillPackagePath, 'build', 'skill-package')
                : this.$plugin.skillPackagePath;
            // Compress skill package
            const zip = new adm_zip_1.default();
            zip.addLocalFolder(zipPath);
            const uploadUrl = await smapi.createNewUploadUrl(this.$context.alexa.askProfile);
            await (0, framework_1.axios)({ url: uploadUrl, method: 'PUT', data: zip.toBuffer() });
            const importId = this.$context.alexa.skillId
                ? await smapi.importSkillPackage(uploadUrl, this.$context.alexa.skillId, this.$context.alexa.askProfile)
                : await smapi.createSkillPackage(uploadUrl, this.$context.alexa.askProfile);
            if (!importId) {
                throw new cli_core_1.JovoCliError({
                    message: 'Something went wrong while importing your skill package',
                    // TODO: Command!
                    hint: 'Try importing your skill package manually using the ASK CLI and copy the resulting skill ID into your project configuration',
                });
            }
            this.$context.alexa.importId = importId;
            // Check import status
            const status = await smapi.getImportStatus(importId, this.$context.alexa.askProfile, this.$context.flags.async);
            const skillId = status.skill.skillId;
            this.$context.alexa.skillId = skillId;
            this.setSkillId(skillId);
            return `Skill ID: ${skillId}`;
        });
        deployTask.add(uploadTask);
        if (!this.$context.flags.async) {
            const validateUploadTask = new cli_core_1.Task('Validating upload', async () => {
                await smapi.getSkillStatus(this.$context.alexa.skillId, this.$context.alexa.askProfile);
                await smapi.enableSkill(this.$context.alexa.skillId, 'development', this.$context.alexa.askProfile);
            });
            deployTask.add(validateUploadTask);
        }
        await deployTask.run();
        if (this.$context.flags.async) {
            cli_core_1.Log.spacer();
            cli_core_1.Log.warning('This is an asynchronous process. You can check the status of your skill package import using the following command:');
            cli_core_1.Log.info(cli_core_1.chalk.dim(`$ ask smapi get-import-status --import-id ${this.$context.alexa.importId}`), {
                indent: 2,
            });
        }
    }
    /**
     * Returns Alexa Skill ID from .ask/config.
     */
    getSkillId() {
        try {
            const askConfig = this.getAskConfig();
            const askProfile = this.$context.alexa.askProfile || 'default';
            const skillId = (0, lodash_get_1.default)(askConfig, `profiles.${askProfile}.skillId`, '');
            if (skillId && skillId.length > 0) {
                return skillId;
            }
        }
        catch (error) {
            if (!(0, cli_core_1.isJovoCliError)(error)) {
                throw new cli_core_1.JovoCliError({ message: error.message, module: this.$plugin.name });
            }
            throw error;
        }
    }
    /**
     * Returns skill information.
     */
    getSkillInformation() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const skillJson = require(this.$plugin.skillJsonPath);
            const info = {
                name: '',
                skillId: this.getSkillId(),
            };
            const locales = (0, lodash_get_1.default)(skillJson, 'manifest.publishingInformation.locales', []);
            for (const locale of Object.keys(locales)) {
                info.name += locales[locale].name + ' (' + locale + ') ';
            }
            return info;
        }
        catch (err) {
            throw new cli_core_1.JovoCliError({ message: err.message, module: this.$plugin.name });
        }
    }
    /**
     * Returns the skill's invocation name.
     * @param locale - The locale for which to get the invocation name.
     */
    getInvocationName(locale) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const alexaModel = require(this.$plugin.getModelPath(locale));
        return (0, lodash_get_1.default)(alexaModel, 'interactionModel.languageModel.invocationName');
    }
}
exports.DeployHook = DeployHook;
//# sourceMappingURL=DeployHook.js.map