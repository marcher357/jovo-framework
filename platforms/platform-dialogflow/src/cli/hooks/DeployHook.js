"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const adm_zip_1 = __importDefault(require("adm-zip"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const utilities_1 = require("../utilities");
class DeployHook extends cli_core_1.PluginHook {
    install() {
        this.middlewareCollection = {
            'install': [this.addCliOptions.bind(this)],
            'before.deploy:platform': [
                this.checkForPlatform.bind(this),
                this.checkForGcloudCli.bind(this),
                this.updatePluginContext.bind(this),
                this.checkForPlatformsFolder.bind(this),
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
     * Deploys platform-specific models to the Dialogflow Console.
     */
    async deploy() {
        const deployTask = new cli_core_1.Task(`${cli_core_1.ROCKET} Deploying to Dialogflow`);
        const zipTask = new cli_core_1.Task('Compressing dialogflow configuration', async () => {
            await this.zipDialogflowFiles();
            return `${this.$context.dialogflow.pathToZip}`;
        });
        const uploadTask = new cli_core_1.Task(`Uploading your agent for project ${(0, cli_core_1.printHighlight)(this.$context.dialogflow.projectId)}`, async () => {
            const keyFilePath = this.$plugin.config.keyFile;
            if (keyFilePath) {
                if (!(0, fs_1.existsSync)((0, path_1.join)(this.$cli.projectPath, keyFilePath))) {
                    throw new cli_core_1.JovoCliError({
                        message: `Keyfile at ${keyFilePath} does not exist.`,
                        module: this.$plugin.name,
                    });
                }
                await (0, utilities_1.activateServiceAccount)(keyFilePath);
                const accessToken = await (0, utilities_1.getGcloudAccessToken)();
                // Upload agent via Dialogflow API.
                try {
                    await (0, axios_1.default)({
                        method: 'POST',
                        url: `https://dialogflow.googleapis.com/v2/projects/${this.$context.dialogflow.projectId}/agent:restore`,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        data: {
                            agentContent: (0, fs_1.readFileSync)(this.$context.dialogflow.pathToZip, 'base64'),
                        },
                    });
                }
                catch (error) {
                    throw new cli_core_1.JovoCliError({
                        message: error.message,
                        module: this.$plugin.name,
                        details: error.response.data.error.message,
                    });
                }
            }
        });
        const trainTask = new cli_core_1.Task('Starting agent training', async () => {
            // Start agent training.
            try {
                const accessToken = await (0, utilities_1.getGcloudAccessToken)();
                await (0, axios_1.default)({
                    method: 'POST',
                    url: `https://dialogflow.googleapis.com/v2/projects/${this.$context.dialogflow.projectId}/agent:train`,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
            catch (error) {
                throw new cli_core_1.JovoCliError({
                    message: error.message,
                    module: this.$plugin.name,
                    details: error.response.data.error.message,
                });
            }
        });
        if (!this.$context.dialogflow.projectId) {
            uploadTask.disable();
            trainTask.disable();
        }
        deployTask.add(zipTask, uploadTask, trainTask);
        await deployTask.run();
    }
    async zipDialogflowFiles() {
        // Remove existing zip file.
        this.$context.dialogflow.pathToZip = (0, path_1.join)(this.$plugin.platformPath, 'dialogflow_agent.zip');
        if ((0, fs_1.existsSync)(this.$context.dialogflow.pathToZip)) {
            (0, fs_1.unlinkSync)(this.$context.dialogflow.pathToZip);
        }
        const zip = new adm_zip_1.default();
        zip.addLocalFolder(this.$plugin.platformPath);
        zip.writeZip(this.$context.dialogflow.pathToZip);
    }
}
exports.DeployHook = DeployHook;
//# sourceMappingURL=DeployHook.js.map