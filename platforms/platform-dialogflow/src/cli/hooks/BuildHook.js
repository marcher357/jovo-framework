"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const filebuilder_1 = require("@jovotech/filebuilder");
const model_dialogflow_1 = require("@jovotech/model-dialogflow");
const fs_1 = require("fs");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const lodash_mergewith_1 = __importDefault(require("lodash.mergewith"));
const path_1 = require("path");
const DefaultFiles_json_1 = __importDefault(require("../DefaultFiles.json"));
const utilities_1 = require("../utilities");
class BuildHook extends cli_core_1.PluginHook {
    install() {
        this.middlewareCollection = {
            'before.build:platform': [
                this.checkForPlatform.bind(this),
                this.updatePluginContext.bind(this),
                this.checkForCleanBuild.bind(this),
                this.validateLocales.bind(this),
            ],
            'build:platform': [this.validateModels.bind(this), this.buildDialogflowAgent.bind(this)],
            'build:platform.reverse': [this.buildReverse.bind(this)],
        };
    }
    /**
     * Checks if the currently selected platform matches this CLI plugin.
     * @param context - Context containing information after flags and args have been parsed by the CLI.
     */
    checkForPlatform() {
        // Check if this plugin should be used or not.
        if (!this.$context.platforms.includes(this.$plugin.id)) {
            this.uninstall();
        }
    }
    /**
     * Checks, if --clean has been set and deletes the platform folder accordingly.
     */
    checkForCleanBuild() {
        // If --clean has been set, delete the respective platform folders before building.
        if (this.$context.flags.clean) {
            (0, cli_core_1.deleteFolderRecursive)(this.$plugin.platformPath);
        }
    }
    /**
     * Checks if any provided locale is not supported, thus invalid.
     */
    validateLocales() {
        const locales = this.$context.locales.reduce((locales, locale) => {
            locales.push(...(0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales));
            return locales;
        }, []);
        for (const locale of locales) {
            const genericLocale = locale.substring(0, 2);
            // For Google Conversational Actions, some locales require a generic locale to be set, e.g. en for en-US.
            if (utilities_1.SupportedLocales.includes(genericLocale) &&
                !locales.includes(genericLocale)) {
                throw new cli_core_1.JovoCliError({
                    message: `Locale ${(0, cli_core_1.printHighlight)(locale)} requires a generic locale ${(0, cli_core_1.printHighlight)(genericLocale)}.`,
                    module: this.$plugin.name,
                });
            }
            if (!utilities_1.SupportedLocales.includes(locale)) {
                throw new cli_core_1.JovoCliError({
                    message: `Locale ${(0, cli_core_1.printHighlight)(locale)} is not supported by Dialogflow.`,
                    module: this.$plugin.name,
                    learnMore: 'For more information on multiple language support: https://cloud.google.com/dialogflow/es/docs/reference/language',
                });
            }
        }
    }
    /**
     * Validates Jovo models with platform-specific validators.
     */
    async validateModels() {
        // Validate Jovo model.
        const validationTask = new cli_core_1.Task(`${cli_core_1.OK_HAND} Validating Dialogflow model files`);
        for (const locale of this.$context.locales) {
            const localeTask = new cli_core_1.Task(locale, async () => {
                const model = await this.$cli.project.getModel(locale);
                await this.$cli.project.validateModel(locale, model, model_dialogflow_1.JovoModelDialogflow.getValidator(model), this.$plugin.name);
                await (0, cli_core_1.wait)(500);
            });
            validationTask.add(localeTask);
        }
        await validationTask.run();
    }
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext() {
        if (!this.$context.dialogflow) {
            this.$context.dialogflow = {};
        }
        this.$context.dialogflow.endpoint =
            (0, lodash_get_1.default)(this.$plugin.config, 'files["agent.json"].webhook.url') ||
                this.$plugin.config.endpoint ||
                this.$cli.resolveEndpoint(this.$cli.project.config.getParameter('endpoint'));
        this.$context.dialogflow.language =
            (0, lodash_get_1.default)(this.$plugin.config, 'files["agent.json"].language') || this.$plugin.config.language;
        // If language is not configured, try to parse it from locales.
        if (!this.$context.dialogflow.language) {
            const locales = this.$context.locales.reduce((locales, locale) => {
                locales.push(...(0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales));
                return locales;
            }, []);
            if (locales.length === 0) {
                // ToDo: Throw error?
                return;
            }
            const primaryLocale = locales.shift();
            const genericLanguage = primaryLocale.substring(0, 2);
            this.$context.dialogflow.language = utilities_1.SupportedLocales.includes(genericLanguage)
                ? genericLanguage
                : primaryLocale;
            this.$context.dialogflow.supportedLanguages = locales;
        }
    }
    async buildDialogflowAgent() {
        const taskStatus = this.$cli.project.hasPlatform(this.$plugin.platformDirectory)
            ? 'Updating'
            : 'Creating';
        const buildTask = new cli_core_1.Task(`${cli_core_1.STATION} ${taskStatus} Dialogflow Agent`);
        const projectFilesTask = new cli_core_1.Task(`${taskStatus} Project Files`, this.createDialogflowProjectFiles.bind(this));
        const buildInteractionModelTask = new cli_core_1.Task(`${taskStatus} Interaction Models`, this.createInteractionModel.bind(this));
        // If no model files for the current locales exist, do not build interaction model.
        if (!this.$cli.project.hasModelFiles(this.$context.locales)) {
            buildInteractionModelTask.disable();
        }
        buildTask.add(projectFilesTask, buildInteractionModelTask);
        await buildTask.run();
    }
    createDialogflowProjectFiles() {
        const files = filebuilder_1.FileBuilder.normalizeFileObject(this.$plugin.config.files || {});
        // If platforms folder doesn't exist, take default files and parse them with project.js config into FileBuilder.
        const projectFiles = this.$cli.project.hasPlatform(this.$plugin.platformDirectory)
            ? files
            : (0, lodash_merge_1.default)(DefaultFiles_json_1.default, files);
        // Set language-specific configuration.
        const agentJson = (0, lodash_merge_1.default)(projectFiles['agent.json'] || {}, {
            language: this.$context.dialogflow.language,
            supportedLanguages: this.$context.dialogflow.supportedLanguages,
            webhook: { url: this.$context.dialogflow.endpoint, available: true },
        });
        projectFiles['agent.json'] = agentJson;
        filebuilder_1.FileBuilder.buildDirectory(projectFiles, this.$plugin.platformPath);
    }
    /**
     * Creates and returns tasks for each locale to build the interaction model for Dialogflow.
     */
    async createInteractionModel() {
        for (const locale of this.$context.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales);
            const resolvedLocalesOutput = resolvedLocales.join(', ');
            // If the model locale is resolved to different locales, provide task details, i.e. "en (en-US, en-CA)"".
            const taskDetails = resolvedLocalesOutput === locale ? '' : `(${resolvedLocalesOutput})`;
            const localeTask = new cli_core_1.Task(`${locale} ${taskDetails}`, async () => {
                await this.buildLanguageModel(locale, resolvedLocales);
                await (0, cli_core_1.wait)(500);
            });
            localeTask.indent(4);
            await localeTask.run();
        }
    }
    /**
     * Builds and saves an Alexa model from a Jovo model.
     * @param modelLocale - Locale of the Jovo model.
     * @param resolvedLocales - Locales to which to resolve the modelLocale.
     */
    async buildLanguageModel(modelLocale, resolvedLocales) {
        if (!(0, fs_1.existsSync)(this.$plugin.intentsFolderPath)) {
            (0, fs_1.mkdirSync)(this.$plugin.intentsFolderPath);
        }
        if (!(0, fs_1.existsSync)(this.$plugin.entitiesFolderPath)) {
            (0, fs_1.mkdirSync)(this.$plugin.entitiesFolderPath);
        }
        try {
            for (const resolvedLocale of resolvedLocales) {
                const model = await this.getJovoModel(modelLocale);
                const jovoModel = new model_dialogflow_1.JovoModelDialogflow(model, resolvedLocale);
                const dialogflowModelFiles = jovoModel.exportNative();
                if (!dialogflowModelFiles || !dialogflowModelFiles.length) {
                    // Should actually never happen but who knows
                    throw new cli_core_1.JovoCliError({
                        message: `Could not build Dialogflow files for locale "${modelLocale}"!`,
                        module: this.$plugin.name,
                    });
                }
                for (const file of dialogflowModelFiles) {
                    const filePath = (0, path_1.join)(this.$plugin.platformPath, ...file.path);
                    // Persist id, if file already exists.
                    if ((0, fs_1.existsSync)(filePath)) {
                        const existingFile = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf-8'));
                        file.content.id = existingFile.id;
                    }
                    (0, fs_1.writeFileSync)((0, path_1.join)(this.$plugin.platformPath, ...file.path), JSON.stringify(file.content, null, 2));
                }
            }
        }
        catch (error) {
            if (!(0, cli_core_1.isJovoCliError)(error)) {
                throw new cli_core_1.JovoCliError({ message: error.message, module: this.$plugin.name });
            }
            throw error;
        }
    }
    async buildReverse() {
        // Since platform can be prompted for, check if this plugin should actually be executed again.
        if (!this.$context.platforms.includes(this.$plugin.id)) {
            return;
        }
        // Get locales to reverse build from.
        // If --locale is not specified, reverse build from every locale available in the platform folder.
        const selectedLocales = [];
        const platformLocales = this.getPlatformLocales();
        if (!this.$context.flags.locale) {
            selectedLocales.push(...platformLocales);
        }
        else {
            // Otherwise only reverse build from the specified locale if it exists inside the platform folder.
            for (const locale of this.$context.flags.locale) {
                if (platformLocales.includes(locale)) {
                    selectedLocales.push(locale);
                }
                else {
                    throw new cli_core_1.JovoCliError({
                        message: `Could not find platform models for locale: ${(0, cli_core_1.printHighlight)(locale)}`,
                        module: this.$plugin.name,
                        hint: `Available locales include: ${platformLocales.join(', ')}`,
                    });
                }
            }
        }
        // Try to resolve the locale according to the locale map provided in this.$plugin.config.locales.
        // If en resolves to en-US, this loop will generate { 'en-US': 'en' }
        const buildLocaleMap = selectedLocales.reduce((localeMap, locale) => {
            localeMap[locale] = locale;
            return localeMap;
        }, {});
        for (const modelLocale in this.$plugin.config.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(modelLocale, utilities_1.SupportedLocales, this.$plugin.config.locales);
            for (const selectedLocale of selectedLocales) {
                if (resolvedLocales.includes(selectedLocale)) {
                    buildLocaleMap[selectedLocale] = modelLocale;
                }
            }
        }
        // If Jovo model files for the current locales exist, ask whether to back them up or not.
        if (this.$cli.project.hasModelFiles(Object.values(buildLocaleMap)) &&
            !this.$context.flags.clean) {
            const answer = await (0, cli_core_1.promptOverwriteReverseBuild)();
            if (answer.overwrite === cli_core_1.ANSWER_CANCEL) {
                return;
            }
            if (answer.overwrite === cli_core_1.ANSWER_BACKUP) {
                // Backup old files.
                const backupTask = new cli_core_1.Task('Creating backups');
                for (const locale of Object.values(buildLocaleMap)) {
                    const localeTask = new cli_core_1.Task(locale, () => this.$cli.project.backupModel(locale));
                    backupTask.add(localeTask);
                }
                await backupTask.run();
            }
        }
        const buildReverseTask = new cli_core_1.Task(`${cli_core_1.REVERSE_ARROWS} Reversing model files`);
        for (const [platformLocale, modelLocale] of Object.entries(buildLocaleMap)) {
            const taskDetails = platformLocale === modelLocale ? '' : `(${modelLocale})`;
            const localeTask = new cli_core_1.Task(`${platformLocale} ${taskDetails}`, async () => {
                const dialogflowModelFiles = this.getPlatformFiles(platformLocale);
                const jovoModel = new model_dialogflow_1.JovoModelDialogflow();
                jovoModel.importNative(dialogflowModelFiles, platformLocale.toLowerCase());
                const nativeData = jovoModel.exportJovoModel();
                if (!nativeData) {
                    throw new cli_core_1.JovoCliError({
                        message: 'Something went wrong while exporting your Jovo model.',
                        module: this.$plugin.name,
                    });
                }
                this.$cli.project.saveModel(nativeData, modelLocale);
                await (0, cli_core_1.wait)(500);
            });
            buildReverseTask.add(localeTask);
        }
        await buildReverseTask.run();
    }
    getPlatformFiles(locale) {
        const platformFiles = [];
        const folders = ['entities', 'intents'];
        for (const folder of folders) {
            const folderPath = (0, path_1.join)(this.$plugin.platformPath, folder);
            if (!(0, fs_1.existsSync)(folderPath)) {
                continue;
            }
            const files = (0, fs_1.readdirSync)(folderPath);
            for (const file of files) {
                if (file.includes('usersays') && !file.includes(locale.toLowerCase())) {
                    continue;
                }
                platformFiles.push({
                    path: [folder, file],
                    content: JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(folderPath, file), 'utf-8')),
                });
            }
        }
        return platformFiles;
    }
    /**
     * Returns all locales for the current platform.
     */
    getPlatformLocales() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const dialogflowAgent = require(this.$plugin.agentJsonPath);
        const locales = [dialogflowAgent.language];
        if (dialogflowAgent.supportedLanguages) {
            locales.push(...dialogflowAgent.supportedLanguages);
        }
        return locales.map((locale) => {
            // Transform locales such as en-us to en-US.
            if (locale.length === 5) {
                return `${locale.substring(0, 2)}-${locale.substring(3).toUpperCase()}`;
            }
            return locale;
        });
    }
    /**
     * Loads a Jovo model specified by a locale and merges it with plugin-specific models.
     * @param locale - The locale that specifies which model to load.
     */
    async getJovoModel(locale) {
        const model = await this.$cli.project.getModel(locale);
        // Merge model with configured language model in project.js.
        (0, lodash_mergewith_1.default)(model, this.$cli.project.config.getParameter(`languageModel.${locale}`) || {}, cli_core_1.mergeArrayCustomizer);
        // Merge model with configured, platform-specific language model in project.js.
        (0, lodash_mergewith_1.default)(model, (0, lodash_get_1.default)(this.$plugin.config, `options.languageModel.${locale}`, {}), cli_core_1.mergeArrayCustomizer);
        return model;
    }
}
exports.BuildHook = BuildHook;
//# sourceMappingURL=BuildHook.js.map