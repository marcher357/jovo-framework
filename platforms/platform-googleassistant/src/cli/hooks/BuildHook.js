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
exports.BuildHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const filebuilder_1 = require("@jovotech/filebuilder");
const model_google_1 = require("@jovotech/model-google");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_has_1 = __importDefault(require("lodash.has"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const lodash_mergewith_1 = __importDefault(require("lodash.mergewith"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const path_1 = require("path");
const yaml = __importStar(require("yaml"));
const DefaultFiles_json_1 = __importDefault(require("../DefaultFiles.json"));
const utilities_1 = require("../utilities");
class BuildHook extends cli_core_1.PluginHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.build:platform': [
                this.checkForPlatform.bind(this),
                this.updatePluginContext.bind(this),
                this.checkForCleanBuild.bind(this),
                this.validateLocales.bind(this),
            ],
            'build:platform': [this.validateModels.bind(this), this.build.bind(this)],
            'build:platform.reverse': [this.buildReverse.bind(this)],
        };
    }
    /**
     * Add platform-specific CLI options, including flags and args.
     * @param context - Context providing an access point to command flags and args.
     */
    addCliOptions(context) {
        if (context.command !== 'build:platform') {
            return;
        }
        context.flags['project-id'] = cli_core_1.flags.string({
            description: 'Google Cloud Project ID',
        });
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
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext() {
        if (!this.$context.googleAssistant) {
            this.$context.googleAssistant = {};
        }
        this.$context.googleAssistant.projectId =
            this.$context.flags['project-id'] || (0, lodash_get_1.default)(this.$plugin.config, 'projectId');
        if (!this.$context.googleAssistant.projectId) {
            throw new cli_core_1.JovoCliError({
                message: 'Could not find project ID.',
                module: this.$plugin.name,
                hint: 'Please provide a project ID by using the flag "--project-id" or in your project configuration.',
            });
        }
        // Set default locale.
        this.setDefaultLocale();
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
                    message: `Locale ${(0, cli_core_1.printHighlight)(locale)} is not supported by Google Conversational Actions.`,
                    module: this.$plugin.name,
                    learnMore: 'For more information on multiple language support: https://developers.google.com/assistant/console/languages-locales',
                });
            }
        }
    }
    /**
     * Validates Jovo models with platform-specific validators.
     */
    async validateModels() {
        // Validate Jovo model.
        const validationTask = new cli_core_1.Task(`${cli_core_1.OK_HAND} Validating Google Assistant model files`);
        for (const locale of this.$context.locales) {
            const localeTask = new cli_core_1.Task(locale, async () => {
                const model = await this.$cli.project.getModel(locale);
                await this.$cli.project.validateModel(locale, model, model_google_1.JovoModelGoogle.getValidator(model), this.$plugin.name);
                await (0, cli_core_1.wait)(500);
            });
            validationTask.add(localeTask);
        }
        await validationTask.run();
    }
    /**
     * Builds Jovo model files from platform-specific files.
     */
    async buildReverse() {
        // Since platform can be prompted for, check if this plugin should actually be executed again.
        if (!this.$context.platforms.includes(this.$plugin.id)) {
            return;
        }
        this.updatePluginContext();
        const reverseBuildTask = new cli_core_1.Task(`${cli_core_1.REVERSE_ARROWS} Reversing model files`);
        if (this.$cli.project.config.getParameter('models.enabled') !== false) {
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
                    const backupTask = new cli_core_1.Task(`${cli_core_1.DISK} Creating backups`);
                    for (const locale of Object.values(buildLocaleMap)) {
                        const localeTask = new cli_core_1.Task(locale, () => this.$cli.project.backupModel(locale));
                        backupTask.add(localeTask);
                    }
                    await backupTask.run();
                }
            }
            for (const [platformLocale, modelLocale] of Object.entries(buildLocaleMap)) {
                const taskDetails = platformLocale === modelLocale ? '' : `(${modelLocale})`;
                const localeTask = new cli_core_1.Task(`${platformLocale} ${taskDetails}`, async () => {
                    // Extract platform models, containing platform-specific intents and entities.
                    const platformFiles = this.getPlatformModels(platformLocale);
                    const jovoModel = new model_google_1.JovoModelGoogle();
                    jovoModel.importNative(platformFiles, modelLocale);
                    const nativeData = jovoModel.exportJovoModel();
                    if (!nativeData) {
                        throw new cli_core_1.JovoCliError({
                            message: 'Something went wrong while exporting your Jovo model.',
                            module: this.$plugin.name,
                        });
                    }
                    nativeData.invocation = this.getPlatformInvocationName(platformLocale);
                    this.$cli.project.saveModel(nativeData, modelLocale);
                    await (0, cli_core_1.wait)(500);
                });
                reverseBuildTask.add(localeTask);
            }
        }
        await reverseBuildTask.run();
    }
    /**
     * Builds platform-specific models from Jovo language model.
     */
    async build() {
        const buildPath = `Path: ./${(0, path_1.join)(this.$cli.project.getBuildDirectory(), this.$plugin.platformDirectory)}`;
        const buildTaskTitle = `${cli_core_1.STATION} Building Google Conversational Action files${(0, cli_core_1.printStage)(this.$cli.project.stage)}\n${(0, cli_core_1.printSubHeadline)(buildPath)}`;
        // Define main build task
        const buildTask = new cli_core_1.Task(buildTaskTitle);
        // Update or create Google Conversational Action project files, depending on whether it has already been built or not
        const projectFilesTask = new cli_core_1.Task(`Project files`, this.buildProjectFiles.bind(this));
        const buildInteractionModelTask = new cli_core_1.Task(`Interaction model`, this.buildInteractionModel.bind(this), {
            enabled: this.$cli.project.config.getParameter('models.enabled') !== false &&
                this.$cli.project.hasModelFiles(this.$context.locales),
        });
        buildTask.add(projectFilesTask, buildInteractionModelTask);
        await buildTask.run();
    }
    /**
     * Creates Google Conversational Action specific project files.
     */
    async buildProjectFiles() {
        const files = filebuilder_1.FileBuilder.normalizeFileObject((0, lodash_get_1.default)(this.$plugin.config, 'files', {}));
        // If platforms folder doesn't exist, take default files and parse them with project.js config into FileBuilder.
        const projectFiles = this.$cli.project.hasPlatform(this.$plugin.platformDirectory)
            ? files
            : (0, lodash_merge_1.default)(DefaultFiles_json_1.default, files);
        // Get default locale.
        // Merge global project.js properties with platform files.
        // Set endpoint.
        const endpoint = this.getPluginEndpoint();
        const webhookPath = 'webhooks/["ActionsOnGoogleFulfillment.yaml"]';
        if (endpoint && !(0, lodash_has_1.default)(projectFiles, webhookPath)) {
            const defaultHandler = {
                handlers: [
                    {
                        name: 'Jovo',
                    },
                ],
                httpsEndpoint: {
                    baseUrl: this.getPluginEndpoint(),
                },
            };
            (0, lodash_set_1.default)(projectFiles, webhookPath, defaultHandler);
        }
        // Set default settings, such as displayName.
        for (const locale of this.$context.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales);
            for (const resolvedLocale of resolvedLocales) {
                const settingsPathArr = ['settings/'];
                if (resolvedLocale !== this.$context.googleAssistant.defaultLocale) {
                    settingsPathArr.push(`${resolvedLocale}/`);
                }
                settingsPathArr.push('["settings.yaml"]');
                const settingsPath = settingsPathArr.join('.');
                // Set default settings.
                if (resolvedLocale === this.$context.googleAssistant.defaultLocale) {
                    if (!(0, lodash_has_1.default)(projectFiles, `${settingsPath}.defaultLocale`)) {
                        (0, lodash_set_1.default)(projectFiles, `${settingsPath}.defaultLocale`, this.$context.googleAssistant.defaultLocale);
                    }
                    if (!(0, lodash_has_1.default)(projectFiles, `${settingsPath}.projectId`)) {
                        (0, lodash_set_1.default)(projectFiles, `${settingsPath}.projectId`, this.$context.googleAssistant.projectId);
                    }
                }
                // Set minimal required localized settings, such as displayName and pronunciation.
                const localizedSettingsPath = `${settingsPath}.localizedSettings`;
                const invocationName = await this.getInvocationName(locale);
                if (!(0, lodash_has_1.default)(projectFiles, `${localizedSettingsPath}.displayName`)) {
                    (0, lodash_set_1.default)(projectFiles, `${localizedSettingsPath}.displayName`, invocationName);
                }
                if (!(0, lodash_has_1.default)(projectFiles, `${localizedSettingsPath}.pronunciation`)) {
                    (0, lodash_set_1.default)(projectFiles, `${localizedSettingsPath}.pronunciation`, invocationName);
                }
            }
        }
        filebuilder_1.FileBuilder.buildDirectory(projectFiles, this.$plugin.platformPath);
        if ((0, fs_1.existsSync)(this.$plugin.config.resourcesDirectory)) {
            // Copies across any resources so they can be used in the project settings manifest.
            // Docs:  https://developers.google.com/assistant/conversational/build/projects?hl=en&tool=sdk#add_resources
            const copyResourcesTask = new cli_core_1.Task(`Copying resources from ${this.$plugin.config.resourcesDirectory}`, () => {
                const src = (0, path_1.join)(this.$cli.projectPath, this.$plugin.config.resourcesDirectory);
                const dest = (0, path_1.join)(this.$plugin.platformPath, 'resources');
                // Delete existing resources folder before copying data
                (0, fs_extra_1.removeSync)(dest);
                (0, fs_extra_1.copySync)(src, dest);
            }, { indentation: 2 });
            await copyResourcesTask.run();
        }
    }
    /**
     * Creates and returns tasks for each locale to build the interaction model for Alexa.
     */
    async buildInteractionModel() {
        const output = [];
        for (const locale of this.$context.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales);
            const resolvedLocalesOutput = resolvedLocales.join(', ');
            // If the model locale is resolved to different locales, provide task details, i.e. "en (en-US, en-CA)"".
            const taskDetails = resolvedLocalesOutput === locale ? '' : `(${resolvedLocalesOutput})`;
            await this.buildLanguageModel(locale, resolvedLocales);
            await (0, cli_core_1.wait)(500);
            output.push(`${locale} ${taskDetails}`);
        }
        return output;
    }
    /**
     * Builds and saves a Google Conversational Action model from a Jovo model.
     * @param modelLocale - Locale of the Jovo model.
     * @param resolvedLocales - Locales to which to resolve the modelLocale.
     */
    async buildLanguageModel(modelLocale, resolvedLocales) {
        const model = (0, lodash_merge_1.default)(await this.getJovoModel(modelLocale), this.$cli.project.config.getParameter(`models.override.${modelLocale}`));
        for (const locale of resolvedLocales) {
            const jovoModel = new model_google_1.JovoModelGoogle(model, locale, this.$context.googleAssistant.defaultLocale);
            const modelFiles = jovoModel.exportNative();
            const actions = {
                custom: {
                    'actions.intent.MAIN': {},
                },
            };
            for (const file of modelFiles) {
                const fileName = file.path.pop();
                const modelPath = (0, path_1.join)(this.$plugin.platformPath, ...file.path);
                // Check if the path for the current model type (e.g. intent, types, ...) exists.
                if (!(0, fs_1.existsSync)(modelPath)) {
                    (0, fs_1.mkdirSync)(modelPath, { recursive: true });
                }
                // Register actions.
                if (file.path.includes('global')) {
                    actions.custom[fileName.replace('.yaml', '')] = {};
                }
                (0, fs_1.writeFileSync)((0, path_1.join)(modelPath, fileName), file.content);
            }
            // Merge existing actions file with configuration in project.js.
            (0, lodash_merge_1.default)(actions, this.getProjectActions());
            const actionsPath = (0, path_1.join)(this.$plugin.platformPath, 'actions');
            if (!(0, fs_1.existsSync)(actionsPath)) {
                (0, fs_1.mkdirSync)(actionsPath, { recursive: true });
            }
            (0, fs_1.writeFileSync)((0, path_1.join)(actionsPath, 'actions.yaml'), yaml.stringify(actions));
        }
    }
    /**
     * Gets configured actions from config.
     */
    getProjectActions() {
        return (0, lodash_get_1.default)(this.$plugin.config, 'files.["actions/"]');
    }
    /**
     * Sets the default locale for the current Conversational Action.
     */
    setDefaultLocale() {
        const resolvedLocales = this.$context.locales.reduce((locales, locale) => {
            locales.push(...(0, cli_core_1.getResolvedLocales)(locale, utilities_1.SupportedLocales, this.$plugin.config.locales));
            return locales;
        }, []);
        let defaultLocale = (0, lodash_get_1.default)(this.$plugin.config, 'files.settings/["settings.yaml"].defaultLocale') ||
            (0, lodash_get_1.default)(this.$plugin.config, 'defaultLocale');
        // Try to get default locale from platform-specific settings.
        const settingsPath = (0, path_1.join)(this.$plugin.platformPath, 'settings', 'settings.yaml');
        if ((0, fs_1.existsSync)(settingsPath)) {
            const settingsFile = (0, fs_1.readFileSync)((0, path_1.join)(this.$plugin.platformPath, 'settings', 'settings.yaml'), 'utf-8');
            const settings = yaml.parse(settingsFile);
            defaultLocale = (0, lodash_get_1.default)(settings, 'defaultLocale');
        }
        if (!defaultLocale && resolvedLocales) {
            // If locales includes an english model, take english as default automatically.
            for (const locale of resolvedLocales) {
                if (locale === 'en') {
                    this.$context.googleAssistant.defaultLocale = locale;
                }
            }
            // Otherwise take the first locale in the array as the default one.
            this.$context.googleAssistant.defaultLocale = resolvedLocales[0];
            return;
        }
        if (!defaultLocale) {
            throw new cli_core_1.JovoCliError({
                message: 'Could not find a default locale.',
                module: this.$plugin.name,
                hint: 'Try adding the property "defaultLocale" to your project.js.',
            });
        }
        this.$context.googleAssistant.defaultLocale = defaultLocale;
    }
    /**
     * Try to get locale resolution (en -> en-US) from project configuration.
     * @param locale - The locale to get the resolution from.
     */
    getProjectLocales(locale) {
        return (0, lodash_get_1.default)(this.$plugin.config, `options.locales.${locale}`);
    }
    /**
     * Get plugin-specific endpoint.
     */
    getPluginEndpoint() {
        const endpoint = (0, lodash_get_1.default)(this.$plugin.config, 'endpoint') ||
            this.$cli.project.config.getParameter('endpoint');
        return this.$cli.resolveEndpoint(endpoint);
    }
    /**
     * Gets the invocation name for the specified locale.
     * @param locale - The locale of the Jovo model to fetch the invocation name from.
     */
    async getInvocationName(locale) {
        const { invocation } = (0, lodash_merge_1.default)(await this.getJovoModel(locale), this.$cli.project.config.getParameter(`models.override.${locale}`));
        if (typeof invocation === 'object') {
            // ToDo: Test!
            const platformInvocation = invocation[this.$plugin.id];
            if (!platformInvocation) {
                throw new cli_core_1.JovoCliError({
                    message: `Can\'t find invocation name for locale ${locale}.`,
                    module: this.$plugin.name,
                });
            }
            return platformInvocation;
        }
        return invocation;
    }
    /**
     * Parses and returns platform-specific intents and entities.
     * @param locale - Locale for which to return the model data.
     */
    getPlatformModels(locale) {
        const platformModels = [];
        const modelPath = (0, path_1.join)(this.$plugin.platformPath, 'custom');
        // Go through a predefined set of folders to extract intent and type information.
        const foldersToInclude = ['intents', 'types', 'scenes', 'global'];
        for (const folder of foldersToInclude) {
            const path = [modelPath, folder];
            if (locale !== this.$context.googleAssistant.defaultLocale) {
                path.push(locale);
            }
            const folderPath = (0, path_1.join)(...path);
            if (!(0, fs_1.existsSync)(folderPath)) {
                continue;
            }
            let files = (0, fs_1.readdirSync)((0, path_1.join)(...path));
            if (folder === 'global') {
                files = files.filter((file) => file.includes('actions.intent'));
            }
            const yamlRegex = /.*\.yaml/;
            for (const file of files) {
                if (yamlRegex.test(file)) {
                    const fileContent = (0, fs_1.readFileSync)((0, path_1.join)(...path, file), 'utf-8');
                    platformModels.push({
                        path: [...path, file],
                        content: yaml.parse(fileContent),
                    });
                }
            }
        }
        return platformModels;
    }
    /**
     * Parses platform-specific settings and returns the localized invocation name.
     * @param locale - Locale for which to parse the invocation name.
     */
    getPlatformInvocationName(locale) {
        const path = [this.$plugin.platformPath, 'settings'];
        if (locale !== this.$context.googleAssistant.defaultLocale) {
            path.push(locale);
        }
        const settingsPath = (0, path_1.join)(...path, 'settings.yaml');
        const settingsFile = (0, fs_1.readFileSync)(settingsPath, 'utf-8');
        const settings = yaml.parse(settingsFile);
        return settings.localizedSettings.displayName;
    }
    /**
     * Returns all locales for the current platform.
     */
    getPlatformLocales() {
        const locales = [];
        const settingsPath = (0, path_1.join)(this.$plugin.platformPath, 'settings');
        const files = (0, fs_1.readdirSync)(settingsPath);
        for (const file of files) {
            if ((0, fs_1.statSync)((0, path_1.join)(settingsPath, file)).isDirectory() &&
                /^[a-z]{2}-?([A-Z]{2})?$/.test(file)) {
                locales.push(file);
            }
            else if (file === 'settings.yaml') {
                const settings = yaml.parse((0, fs_1.readFileSync)((0, path_1.join)(settingsPath, file), 'utf-8'));
                locales.push(settings.defaultLocale);
            }
        }
        return locales;
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
        (0, lodash_mergewith_1.default)(model, (0, lodash_get_1.default)(this.$plugin.config, `languageModel.${locale}`, {}), cli_core_1.mergeArrayCustomizer);
        return model;
    }
}
exports.BuildHook = BuildHook;
//# sourceMappingURL=BuildHook.js.map