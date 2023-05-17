import { ArrayElement, DeepPartial, Extensible, Jovo, Plugin, PluginConfig } from '@jovotech/framework';
import { IncomingWebhookSendArguments } from '@slack/webhook';
export type SlackBlock = ArrayElement<Exclude<IncomingWebhookSendArguments['blocks'], undefined>>;
export interface SlackFieldMap {
    locale: boolean;
    platform: boolean;
    state: boolean;
    userId: boolean;
}
export type SlackCustomBlocksFunction = (jovo: Jovo) => SlackBlock[];
export type SlackTransformErrorFunction = (error: Error, jovo?: Jovo) => string | IncomingWebhookSendArguments | undefined;
export interface SlackPluginConfig extends PluginConfig {
    webhookUrl: string;
    channel: string;
    logErrors: boolean;
    fields: SlackFieldMap;
    customBlocks?: SlackCustomBlocksFunction;
    transformError?: SlackTransformErrorFunction;
}
export type SlackPluginInitConfig = DeepPartial<SlackPluginConfig> & Pick<SlackPluginConfig, 'webhookUrl' | 'channel'>;
export declare class SlackPlugin extends Plugin<SlackPluginConfig> {
    private client;
    constructor(config: SlackPluginInitConfig);
    getDefaultConfig(): SlackPluginConfig;
    install(parent: Extensible): void;
    mount(parent: Extensible): void;
    dismount(parent: Extensible): void;
    onError: (error: Error, jovo?: Jovo) => void;
    sendError(error: Error, jovo?: Jovo): void;
    sendMessage(message: string | IncomingWebhookSendArguments): void;
    getErrorMessage(error: Error, jovo?: Jovo): string | IncomingWebhookSendArguments | undefined;
    getBlocksFromFieldMap(jovo?: Jovo): SlackBlock[];
    getBlockFor(key: keyof SlackFieldMap, jovo: Jovo): SlackBlock | undefined;
    getCloudWatchBlock(jovo: Jovo): SlackBlock | undefined;
}
