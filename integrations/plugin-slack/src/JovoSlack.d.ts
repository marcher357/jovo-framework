import { Jovo } from '@jovotech/framework';
import { IncomingWebhookSendArguments } from '@slack/webhook';
import { SlackPlugin, SlackPluginConfig } from './SlackPlugin';
export declare class JovoSlack {
    readonly slackPlugin: SlackPlugin;
    constructor(slackPlugin: SlackPlugin);
    get config(): SlackPluginConfig;
    sendError(error: Error, jovo?: Jovo): void;
    sendMessage(message: string | IncomingWebhookSendArguments): void;
}
