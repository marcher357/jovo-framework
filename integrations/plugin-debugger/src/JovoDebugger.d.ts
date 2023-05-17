import { App, Extensible, HandleRequest, Jovo, NluPlugin, Plugin, PluginConfig, SluPlugin, UnknownObject } from '@jovotech/framework';
import { CorePlatform } from '@jovotech/platform-core';
import { Socket } from 'socket.io-client';
import { JovoStateMutationData, JovoUpdateData } from './interfaces';
export interface JovoDebuggerConfig extends PluginConfig {
    nlu: NluPlugin | SluPlugin;
    webhookUrl: string;
    debuggerConfigPath: string;
    modelsPath: string;
    ignoredProperties: Array<keyof Jovo | string>;
    plugins: Plugin[];
}
export declare function getDefaultLanguageMap(): UnknownObject;
export declare class JovoDebuggerPlatform extends CorePlatform<'JovoDebuggerPlatform'> {
}
export declare class JovoDebugger extends Plugin<JovoDebuggerConfig> {
    socket?: typeof Socket;
    hasOverriddenWrite: boolean;
    hasShownConnectionError: boolean;
    getDefaultConfig(): JovoDebuggerConfig;
    install(parent: Extensible): void;
    private installDebuggerPlatform;
    initialize(app: App): Promise<void>;
    mount(parent: HandleRequest): Promise<void> | void;
    emitUpdate(requestId: string | number, data: JovoUpdateData): void;
    emitStateMutation(requestId: string | number, data: JovoStateMutationData): void;
    emitResponse(response: any, requestId?: string | number): void;
    private augmentServerForApp;
    private augmentServerForRequest;
    private patchHandleRequestToIncludeUniqueId;
    private patchPlatformsToCreateJovoAsProxy;
    private createObjectProxyHandler;
    private createStateMutationProxyHandler;
    private getStateMutationData;
    private onConnected;
    private onDebuggingAvailable;
    private onReceiveRequest;
    private onRequest;
    private emitLanguageModelIfEnabled;
    private loadLanguageModel;
    private emitDebuggerConfig;
    private loadDebuggerConfig;
    private connectToWebhook;
    private retrieveLocalWebhookId;
    private onSocketNotConnected;
    private requireUncached;
}
