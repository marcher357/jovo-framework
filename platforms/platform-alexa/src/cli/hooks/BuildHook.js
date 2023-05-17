"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const filebuilder_1 = require("@jovotech/filebuilder");
const model_alexa_1 = require("@jovotech/model-alexa");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_has_1 = __importDefault(require("lodash.has"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const lodash_mergewith_1 = __importDefault(require("lodash.mergewith"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const path_1 = require("path");
const constants_1 = require("../constants");
const DefaultFiles_json_1 = __importDefault(require("../DefaultFiles.json"));
const AlexaHook_1 = require("./AlexaHook");
class BuildHook extends AlexaHook_1.AlexaHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.build:platform': [
                this.updatePluginContext.bind(this),
                this.checkForPlatform.bind(this),
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
        context.flags['ask-profile'] = cli_core_1.flags.string({
            description: 'Name of used ASK profile',
        });
    }
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext() {
        super.updatePluginContext();
        this.$context.alexa.askProfile =
            this.$context.flags['ask-profile'] || this.$plugin.config.askProfile || 'default';
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
     * Checks if any provided locale is not supported, thus invalid.
     */
    validateLocales() {
        for (const locale of this.$context.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(locale, constants_1.SupportedLocales, this.$plugin.config.locales);
            for (const resolvedLocale of resolvedLocales) {
                if (!constants_1.SupportedLocales.includes(resolvedLocale)) {
                    throw new cli_core_1.JovoCliError({
                        message: `Locale ${(0, cli_core_1.printHighlight)(resolvedLocale)} is not supported by Amazon Alexa.`,
                        module: this.$plugin.name,
                        hint: resolvedLocale.length === 2
                            ? 'Alexa does not support generic locales, please specify locales in your project configuration.'
                            : '',
                        learnMore: 'https://www.jovo.tech/marketplace/platform-alexa/project-config#locales',
                    });
                }
            }
        }
    }
    /**
     * Validates Jovo models with platform-specific validators.
     */
    async validateModels() {
        // Validate Jovo model
        const validationTask = new cli_core_1.Task(`${cli_core_1.OK_HAND} Validating Alexa model files`);
        for (const locale of this.$context.locales) {
            const localeTask = new cli_core_1.Task(locale, async () => {
                const model = await this.$cli.project.getModel(locale);
                await this.$cli.project.validateModel(locale, model, model_alexa_1.JovoModelAlexa.getValidator(model), this.$plugin.name);
                await (0, cli_core_1.wait)(500);
            });
            validationTask.add(localeTask);
        }
        await validationTask.run();
    }
    /**
     * Checks if --clean has been set and deletes the platform folder accordingly
     */
    checkForCleanBuild() {
        // If --clean has been set, delete the respective platform folders before building
        if (this.$context.flags.clean) {
            (0, cli_core_1.deleteFolderRecursive)(this.$plugin.platformPath);
        }
    }
    async build() {
        const buildPath = `Path: ./${(0, path_1.join)(this.$cli.project.getBuildDirectory(), this.$plugin.platformDirectory)}`;
        const buildTaskTitle = `${cli_core_1.STATION} Building Alexa Skill files${(0, cli_core_1.printStage)(this.$cli.project.stage)}\n${(0, cli_core_1.printSubHeadline)(buildPath)}`;
        // Define main build task.
        const buildTask = new cli_core_1.Task(buildTaskTitle);
        // Update or create Alexa project files, depending on whether it has already been built or not.
        const projectFilesTask = new cli_core_1.Task(`Project files`, this.buildProjectFiles.bind(this));
        const interactionModelTask = new cli_core_1.Task(`Interaction model`, this.buildInteractionModel.bind(this), {
            enabled: this.$cli.project.config.getParameter('models.enabled') !== false &&
                this.$cli.project.hasModelFiles(this.$context.locales),
        });
        const buildConversationFilesTask = new cli_core_1.Task(`Alexa Conversations files`, this.buildConversationsFiles.bind(this), { enabled: this.$context.alexa.isACSkill });
        const buildResponseFilesTask = new cli_core_1.Task(`Response files`, this.buildResponseFiles.bind(this), { enabled: this.$context.alexa.isACSkill });
        buildTask.add(interactionModelTask, projectFilesTask, buildConversationFilesTask, buildResponseFilesTask);
        await buildTask.run();
    }
    /**
     * Builds Jovo model files from platform-specific files.
     */
    async buildReverse() {
        var _a, _b, _c;
        // Since platform can be prompted for, check if this plugin should actually be executed again.
        if (!this.$context.platforms.includes(this.$plugin.id)) {
            return;
        }
        this.updatePluginContext();
        const reverseBuildTask = new cli_core_1.Task(`${cli_core_1.REVERSE_ARROWS} Reversing Alexa files`);
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
                const resolvedLocales = (0, cli_core_1.getResolvedLocales)(modelLocale, constants_1.SupportedLocales, this.$plugin.config.locales);
                for (const selectedLocale of selectedLocales) {
                    if (resolvedLocales.includes(selectedLocale)) {
                        buildLocaleMap[selectedLocale] = modelLocale;
                    }
                }
            }
            // If Jovo model files for the current locales or resource files exist, ask whether to back them up or not.
            if (this.$cli.project.hasModelFiles(Object.values(buildLocaleMap)) ||
                (this.$context.alexa.isACSkill && (0, fs_1.existsSync)(this.$plugin.resourcesDirectory))) {
                const answer = await (0, cli_core_1.promptOverwriteReverseBuild)();
                if (answer.overwrite === cli_core_1.ANSWER_CANCEL) {
                    return;
                }
                if (answer.overwrite === cli_core_1.ANSWER_BACKUP) {
                    cli_core_1.Log.spacer();
                    // Backup old files.
                    const backupTask = new cli_core_1.Task(`${cli_core_1.DISK} Creating backups`);
                    const date = new Date().toISOString();
                    if ((0, fs_1.existsSync)(this.$cli.project.getModelsDirectory())) {
                        const modelsBackupDirectory = `${this.$cli.project.getModelsDirectory()}.${date}`;
                        const modelTask = new cli_core_1.Task(`${this.$cli.project.getModelsDirectory()} -> ${modelsBackupDirectory}`, () => {
                            (0, fs_extra_1.moveSync)(this.$cli.project.getModelsDirectory(), modelsBackupDirectory, {
                                overwrite: true,
                            });
                        });
                        backupTask.add(modelTask);
                    }
                    if ((0, fs_1.existsSync)(this.$plugin.resourcesDirectory)) {
                        const resourcesBackupDirectory = `${this.$plugin.resourcesDirectory}.${date}`;
                        const resourcesTask = new cli_core_1.Task(`${this.$plugin.resourcesDirectory} -> ${resourcesBackupDirectory}`, () => {
                            (0, fs_extra_1.moveSync)(this.$plugin.resourcesDirectory, resourcesBackupDirectory, {
                                overwrite: true,
                            });
                        });
                        backupTask.add(resourcesTask);
                    }
                    await backupTask.run();
                }
            }
            for (const [platformLocale, modelLocale] of Object.entries(buildLocaleMap)) {
                const taskDetails = platformLocale === modelLocale ? '' : `(${modelLocale})`;
                const localeTask = new cli_core_1.Task(`${platformLocale} ${taskDetails}`, async () => {
                    const alexaModelFiles = [
                        {
                            path: [],
                            content: this.getPlatformModel(platformLocale),
                        },
                    ];
                    const jovoModel = new model_alexa_1.JovoModelAlexa();
                    jovoModel.importNative(alexaModelFiles, modelLocale);
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
                reverseBuildTask.add(localeTask);
            }
        }
        if (this.$context.alexa.isACSkill && ((_a = this.$plugin.config.conversations) === null || _a === void 0 ? void 0 : _a.directory)) {
            if (((_b = this.$plugin.config.conversations) === null || _b === void 0 ? void 0 : _b.acdlDirectory) &&
                (0, fs_1.existsSync)(this.$plugin.conversationsDirectory)) {
                const acdlPath = (0, path_1.join)(this.$plugin.config.conversations.directory, this.$plugin.config.conversations.acdlDirectory);
                const copyAcdlFilesTask = new cli_core_1.Task(`Copying Alexa Conversations files into ${acdlPath}`, () => (0, fs_extra_1.copySync)(this.$plugin.conversationsDirectory, acdlPath));
                reverseBuildTask.add(copyAcdlFilesTask);
            }
            if (((_c = this.$plugin.config.conversations) === null || _c === void 0 ? void 0 : _c.responsesDirectory) &&
                (0, fs_1.existsSync)(this.$plugin.responseDirectory)) {
                const responsesPath = (0, path_1.join)(this.$plugin.config.conversations.directory, this.$plugin.config.conversations.responsesDirectory);
                const copyResponseFilesTask = new cli_core_1.Task(`Copying Response files into ${responsesPath}`, () => (0, fs_extra_1.copySync)(this.$plugin.responseDirectory, responsesPath));
                reverseBuildTask.add(copyResponseFilesTask);
            }
        }
        await reverseBuildTask.run();
    }
    /**
     * Builds the Alexa skill manifest.
     */
    buildProjectFiles() {
        var _a, _b;
        const files = filebuilder_1.FileBuilder.normalizeFileObject((0, lodash_get_1.default)(this.$plugin.config, 'files', {}));
        // If platforms folder doesn't exist, take default files and parse them with project.js config into FileBuilder.
        const projectFiles = this.$cli.project.hasPlatform(this.$plugin.platformDirectory)
            ? files
            : (0, lodash_merge_1.default)(DefaultFiles_json_1.default, files);
        // Merge global project.js properties with platform files.
        const endpoint = this.getPluginEndpoint();
        const endpointPath = 'skill-package/["skill.json"].manifest.apis.custom.endpoint';
        // If a global endpoint is given and one is not already specified, set the global one.
        if (!(0, lodash_has_1.default)(projectFiles, endpointPath)) {
            // If endpoint is of type ARN, omit the Wildcard certificate.
            const certificate = !endpoint.startsWith('arn') ? 'Wildcard' : null;
            // Create basic HTTPS endpoint from Wildcard SSL.
            (0, lodash_set_1.default)(projectFiles, endpointPath, {
                sslCertificateType: certificate,
                uri: endpoint,
            });
        }
        // replace ${JOVO_WEBHOOK_URL} in event uri with the Jovo Webhook url
        const eventEndpointUriPath = 'skill-package/["skill.json"].manifest.events.endpoint.uri';
        if ((0, lodash_has_1.default)(projectFiles, eventEndpointUriPath)) {
            (0, lodash_set_1.default)(projectFiles, eventEndpointUriPath, this.$cli.resolveEndpoint((0, lodash_get_1.default)(projectFiles, eventEndpointUriPath).toString()));
        }
        // Create entries for Alexa Conversations
        const conversationsPath = 'skill-package/["skill.json"].manifest.apis.custom.dialogManagement';
        if (this.$context.alexa.isACSkill && !(0, lodash_has_1.default)(projectFiles, conversationsPath)) {
            (0, lodash_set_1.default)(projectFiles, conversationsPath, {
                sessionStartDelegationStrategy: {
                    target: (_b = (_a = this.$plugin.config.conversations) === null || _a === void 0 ? void 0 : _a.sessionStartDelegationStrategy) === null || _b === void 0 ? void 0 : _b.target,
                },
                dialogManagers: [
                    {
                        type: 'AMAZON.Conversations',
                    },
                ],
            });
        }
        // Create ask profile entry
        const askResourcesPath = `["ask-resources.json"].profiles.${this.$context.alexa.askProfile}`;
        if (!(0, lodash_has_1.default)(projectFiles, askResourcesPath)) {
            (0, lodash_set_1.default)(projectFiles, askResourcesPath, {
                skillMetadata: {
                    src: './skill-package',
                },
            });
        }
        const askConfigPath = `[".ask/"].["ask-states.json"].profiles.${this.$context.alexa.askProfile}`;
        const skillId = this.$plugin.config.skillId;
        const skillIdPath = `${askConfigPath}.skillId`;
        // Check whether skill id has already been set.
        if (skillId && !(0, lodash_has_1.default)(projectFiles, skillIdPath)) {
            (0, lodash_set_1.default)(projectFiles, skillIdPath, skillId);
        }
        const skillName = this.$cli.project.getProjectName();
        const locales = this.$context.locales.reduce((locales, locale) => {
            locales.push(...(0, cli_core_1.getResolvedLocales)(locale, constants_1.SupportedLocales, this.$plugin.config.locales));
            return locales;
        }, []);
        for (const locale of locales) {
            // Check whether publishing information has already been set.
            const publishingInformationPath = `skill-package/["skill.json"].manifest.publishingInformation.locales.${locale}`;
            if (!(0, lodash_has_1.default)(projectFiles, publishingInformationPath)) {
                (0, lodash_set_1.default)(projectFiles, publishingInformationPath, {
                    summary: 'Sample Short Description',
                    examplePhrases: ['Alexa open hello world'],
                    keywords: ['hello', 'world'],
                    name: skillName,
                    description: 'Sample Full Description',
                    smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
                    largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
                });
            }
            const privacyAndCompliancePath = `skill-package/["skill.json"].manifest.privacyAndCompliance.locales.${locale}`;
            // Check whether privacy and compliance information has already been set.
            if (!(0, lodash_has_1.default)(projectFiles, privacyAndCompliancePath)) {
                (0, lodash_set_1.default)(projectFiles, privacyAndCompliancePath, {
                    privacyPolicyUrl: 'http://example.com/policy',
                    termsOfUseUrl: '',
                });
            }
        }
        filebuilder_1.FileBuilder.buildDirectory(projectFiles, this.$plugin.platformPath);
    }
    /**
     * Creates and returns tasks for each locale to build the interaction model for Alexa.
     */
    async buildInteractionModel() {
        const output = [];
        for (const locale of this.$context.locales) {
            const resolvedLocales = (0, cli_core_1.getResolvedLocales)(locale, constants_1.SupportedLocales, this.$plugin.config.locales);
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
     * Builds and saves an Alexa model from a Jovo model.
     * @param modelLocale - Locale of the Jovo model.
     * @param resolvedLocales - Locales to which to resolve the modelLocale.
     */
    async buildLanguageModel(modelLocale, resolvedLocales) {
        const model = (0, lodash_merge_1.default)(await this.getJovoModel(modelLocale), this.$cli.project.config.getParameter(`models.override.${modelLocale}`));
        try {
            for (const locale of resolvedLocales) {
                const jovoModel = new model_alexa_1.JovoModelAlexa(model, locale);
                const alexaModelFiles = jovoModel.exportNative();
                if (!alexaModelFiles || !alexaModelFiles.length) {
                    // Should actually never happen but who knows
                    throw new cli_core_1.JovoCliError({
                        message: `Could not build Alexa files for locale "${locale}"!`,
                        module: this.$plugin.name,
                    });
                }
                const modelsPath = this.$plugin.modelsPath;
                if (!(0, fs_1.existsSync)(modelsPath)) {
                    (0, fs_1.mkdirSync)(modelsPath, { recursive: true });
                }
                (0, fs_1.writeFileSync)(this.$plugin.getModelPath(locale), JSON.stringify(alexaModelFiles[0].content, null, 2));
            }
        }
        catch (error) {
            if (!(0, cli_core_1.isJovoCliError)(error)) {
                throw new cli_core_1.JovoCliError({ message: error.message, module: this.$plugin.name });
            }
            throw error;
        }
    }
    buildConversationsFiles() {
        const src = (0, path_1.join)(this.$plugin.config.conversations.directory, this.$plugin.config.conversations.acdlDirectory);
        if (!(0, fs_1.existsSync)(src)) {
            throw new cli_core_1.JovoCliError({
                message: `Directory for Alexa Conversations files does not exist at ${src}`,
                module: this.$plugin.name,
                hint: `Try creating your .acdl files in ${src} or specify the directory of your choice in the project configuration`,
            });
        }
        (0, fs_extra_1.copySync)(src, this.$plugin.conversationsDirectory);
    }
    buildResponseFiles() {
        const src = (0, path_1.join)(this.$plugin.config.conversations.directory, this.$plugin.config.conversations.responsesDirectory);
        if (!(0, fs_1.existsSync)(src)) {
            throw new cli_core_1.JovoCliError({
                message: `Directory for Alexa response files does not exist at ${src}`,
                module: this.$plugin.name,
                hint: `Try creating your APL-A response files in ${src} or specify the directory of your choice in the project configuration`,
            });
        }
        (0, fs_extra_1.copySync)(src, this.$plugin.responseDirectory);
    }
    /**
     * Get plugin-specific endpoint.
     */
    getPluginEndpoint() {
        const endpoint = (0, lodash_get_1.default)(this.$plugin.config, 'endpoint') ||
            this.$cli.project.config.getParameter('endpoint');
        if (!endpoint) {
            throw new cli_core_1.JovoCliError({
                message: 'endpoint has to be set',
                hint: 'Try setting your endpoint in the project configuration',
                learnMore: 'https://www.jovo.tech/docs/project-config#endpoint',
            });
        }
        return this.$cli.resolveEndpoint(endpoint);
    }
    /**
     * Loads a platform-specific model.
     * @param locale - Locale of the model.
     */
    getPlatformModel(locale) {
        const content = (0, fs_1.readFileSync)(this.$plugin.getModelPath(locale), 'utf-8');
        return JSON.parse(content);
    }
    /**
     * Returns all locales for the current platform.
     */
    getPlatformLocales() {
        const files = (0, fs_1.readdirSync)(this.$plugin.modelsPath);
        if (!(0, fs_1.existsSync)(this.$plugin.modelsPath)) {
            throw new cli_core_1.JovoCliError({
                message: 'Could not find Alexa language models',
                details: `"${this.$plugin.modelsPath}" does not exist`,
                hint: 'Please validate that you configured the "buildDirectory" or "stage" correctly',
            });
        }
        // Map each file to it's identifier, without file extension.
        return files.map((file) => {
            const localeRegex = /(.*)\.(?:[^.]+)$/;
            const match = localeRegex.exec(file);
            // ToDo: Test!
            if (!match) {
                return file;
            }
            return match[1];
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