"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackPlugin = void 0;
const framework_1 = require("@jovotech/framework");
const webhook_1 = require("@slack/webhook");
const JovoSlack_1 = require("./JovoSlack");
class SlackPlugin extends framework_1.Plugin {
    constructor(config) {
        super(config);
        this.onError = (error, jovo) => {
            if (!this.config.logErrors) {
                return;
            }
            this.sendError(error, jovo);
        };
        this.client = new webhook_1.IncomingWebhook(config.webhookUrl);
    }
    getDefaultConfig() {
        return {
            webhookUrl: '',
            channel: '',
            logErrors: true,
            fields: {
                locale: false,
                platform: true,
                state: false,
                userId: false,
            },
        };
    }
    install(parent) {
        if (!(parent instanceof framework_1.App)) {
            throw new framework_1.InvalidParentError(this.name, framework_1.App);
        }
    }
    mount(parent) {
        if (!(parent instanceof framework_1.HandleRequest)) {
            throw new framework_1.InvalidParentError(this.name, framework_1.HandleRequest);
        }
        parent.middlewareCollection.use('before.request.start', (jovo) => {
            jovo.$slack = new JovoSlack_1.JovoSlack(this);
        });
        parent.app.onError(this.onError);
    }
    dismount(parent) {
        if (!(parent instanceof framework_1.HandleRequest)) {
            throw new framework_1.InvalidParentError(this.name, framework_1.HandleRequest);
        }
        parent.app.removeErrorListener(this.onError);
    }
    sendError(error, jovo) {
        const sendArgs = this.getErrorMessage(error, jovo);
        if (!sendArgs)
            return;
        return this.sendMessage(sendArgs);
    }
    sendMessage(message) {
        this.client
            .send(message)
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .then(() => { })
            .catch((e) => {
            // eslint-disable-next-line no-console
            console.warn(e);
        });
    }
    getErrorMessage(error, jovo) {
        if (this.config.transformError) {
            return this.config.transformError(error, jovo);
        }
        return {
            channel: this.config.channel,
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: '🔴 An error occurred',
                        emoji: true,
                    },
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Error message*\n${error.message}${error.stack ? `\n\n*Error stack*\n \`\`\`${error.stack}\`\`\`` : ''}`,
                    },
                },
                ...this.getBlocksFromFieldMap(jovo),
            ],
        };
    }
    getBlocksFromFieldMap(jovo) {
        if (!jovo)
            return [];
        const blocks = Object.entries(this.config.fields).reduce((blocks, [key, enabled]) => {
            if (enabled) {
                const block = this.getBlockFor(key, jovo);
                if (block) {
                    blocks.push(block);
                }
            }
            return blocks;
        }, []);
        const cloudWatchBlock = this.getCloudWatchBlock(jovo);
        if (cloudWatchBlock) {
            blocks.push(cloudWatchBlock);
        }
        if (this.config.customBlocks) {
            const customBlocks = this.config.customBlocks(jovo);
            if (customBlocks === null || customBlocks === void 0 ? void 0 : customBlocks.length) {
                blocks.push(...customBlocks);
            }
        }
        return blocks;
    }
    getBlockFor(key, jovo) {
        if (key === 'locale') {
            return {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Locale*\n${jovo.$request.getLocale() || 'undefined'}`,
                },
            };
        }
        if (key === 'platform') {
            return {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Platform*\n${jovo.$platform.name}`,
                },
            };
        }
        if (key === 'state') {
            return {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*State*\n \`\`\`${jovo.$state ? JSON.stringify(jovo.$state, undefined, 2) : 'undefined'}\`\`\``,
                },
            };
        }
        if (key === 'userId') {
            return {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*User ID*\n${jovo.$user.id || 'undefined'}`,
                },
            };
        }
    }
    getCloudWatchBlock(jovo) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = jovo.$server.context;
        if (context === null || context === void 0 ? void 0 : context.awsRequestId) {
            const region = context.invokedFunctionArn.split(':')[3]; // e.g. arn:aws:lambda:eu-west-1:820261819571:function:testName
            const baseUrl = `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/`;
            const logGroup = `${context.logGroupName.replace(/\//g, '$252F')}/log-events/`;
            const logStream = `${context
                .logStreamName.replace('$', '$2524')
                .replace('[', '$255B')
                .replace(']', '$255D')
                .replace(/\//g, '$252F')}`;
            const filterPattern = `$3FfilterPattern$3D$2522${context.awsRequestId}$2522`; // $2522 -> "
            const cloudWatchUrl = baseUrl + logGroup + logStream + filterPattern;
            return {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Cloudwatch URL*\n<${cloudWatchUrl}|Cloudwatch Log URL>`,
                },
            };
        }
    }
}
exports.SlackPlugin = SlackPlugin;
//# sourceMappingURL=SlackPlugin.js.map