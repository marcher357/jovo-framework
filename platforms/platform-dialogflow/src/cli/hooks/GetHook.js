"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const adm_zip_1 = __importDefault(require("adm-zip"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const utilities_1 = require("../utilities");
class GetHook extends cli_core_1.PluginHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.get:platform': [
                this.checkForPlatform.bind(this),
                this.checkForGcloudCli.bind(this),
                this.updatePluginContext.bind(this),
                this.checkForExistingPlatformFiles.bind(this),
            ],
            'get:platform': [this.get.bind(this)],
        };
    }
    addCliOptions(context) {
        if (context.command !== 'get:platform') {
            return;
        }
        context.flags['project-id'] = cli_core_1.flags.string({
            description: 'Dialogflow Project ID',
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
    async checkForGcloudCli() {
        try {
            await (0, cli_core_1.execAsync)('gcloud --version');
        }
        catch (error) {
            throw new cli_core_1.JovoCliError({
                message: 'Jovo CLI requires gcloud CLI for deployment to Dialogflow.',
                module: this.$plugin.name,
                learnMore: 'To install the gcloud CLI, follow this guide: https://cloud.google.com/sdk/docs/install',
            });
        }
    }
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext() {
        if (!this.$context.dialogflow) {
            this.$context.dialogflow = {};
        }
        this.$context.dialogflow.projectId =
            this.$context.flags['project-id'] || this.$plugin.config.projectId;
        if (!this.$context.dialogflow.projectId) {
            throw new cli_core_1.JovoCliError({
                message: 'Could not find project ID.',
                module: this.$plugin.name,
                hint: 'Please provide a project ID by using the flag "--project-id" or in your project configuration.',
            });
        }
    }
    /**
     * Checks if platform-specific files already exist and prompts for overwriting them.
     */
    async checkForExistingPlatformFiles() {
        if (!this.$context.flags.clean && (0, fs_1.existsSync)(this.$plugin.platformPath)) {
            const answer = await (0, cli_core_1.promptOverwrite)('Found existing Dialogflow project files. How to proceed?');
            if (answer.overwrite === cli_core_1.ANSWER_CANCEL) {
                this.uninstall();
            }
        }
    }
    /**
     * Fetches platform-specific models from the Dialogflow Console.
     */
    async get() {
        const platformPath = this.$plugin.platformPath;
        if (!(0, fs_1.existsSync)(platformPath)) {
            (0, fs_1.mkdirSync)(platformPath);
        }
        const getTask = new cli_core_1.Task(`${cli_core_1.DOWNLOAD} Getting Dialogflow Agent files for ${(0, cli_core_1.printHighlight)(this.$context.dialogflow.projectId)}`);
        const downloadTask = new cli_core_1.Task('Downloading project files', async () => {
            const keyFilePath = this.$plugin.config.keyFile;
            if (!keyFilePath) {
                throw new cli_core_1.JovoCliError({
                    message: "Couldn't find keyfile.",
                    module: this.$plugin.name,
                    hint: 'Please provide a key file for authorization.',
                });
            }
            if (!(0, fs_1.existsSync)((0, path_1.join)(this.$cli.projectPath, keyFilePath))) {
                throw new cli_core_1.JovoCliError({
                    message: `Keyfile at ${keyFilePath} does not exist.`,
                    module: this.$plugin.name,
                });
            }
            await (0, utilities_1.activateServiceAccount)(keyFilePath);
            const accessToken = await (0, utilities_1.getGcloudAccessToken)();
            // Get agent from Dialogflow.
            try {
                const response = await (0, axios_1.default)({
                    method: 'POST',
                    url: `https://dialogflow.googleapis.com/v2beta1/projects/${this.$context.dialogflow.projectId}/agent:export`,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                const zip = new adm_zip_1.default(Buffer.from(response.data.response.agentContent, 'base64'));
                zip.extractAllTo(platformPath, true);
            }
            catch (error) {
                if (error.isAxiosError) {
                    throw new cli_core_1.JovoCliError({
                        message: error.message,
                        module: this.$plugin.name,
                        details: error.response.data.error.message,
                    });
                }
                throw new cli_core_1.JovoCliError({ message: error.message, module: this.$plugin.name });
            }
        });
        const extractTask = new cli_core_1.Task(`Extracting files to ${platformPath}`, async () => {
            await (0, cli_core_1.wait)(500);
        });
        getTask.add(downloadTask, extractTask);
        await getTask.run();
    }
}
exports.GetHook = GetHook;
//# sourceMappingURL=GetHook.js.map