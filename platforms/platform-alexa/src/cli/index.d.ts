import { JovoCliPlugin, PluginHook, PluginType, RequiredOnlyWhere } from '@jovotech/cli-core';
import { AlexaCliConfig } from './interfaces';
export type AlexaCliInitConfig = RequiredOnlyWhere<AlexaCliConfig, 'conversations.enabled'> | {
    conversations: boolean;
};
export declare class AlexaCli extends JovoCliPlugin<AlexaCliConfig> {
    constructor(config?: AlexaCliInitConfig);
    get id(): string;
    get type(): PluginType;
    get platformDirectory(): string;
    getDefaultConfig(): AlexaCliConfig;
    getInitConfig(): Promise<AlexaCliConfig>;
    getHooks(): typeof PluginHook[];
    /**
     * The base path to platform's build folder
     */
    get platformPath(): string;
    get resourcesDirectory(): string;
    /**
     * The path to Alexa skill package folder
     */
    get skillPackagePath(): string;
    /**
     * The path to the skill.json file
     */
    get skillJsonPath(): string;
    get modelsPath(): string;
    get accountLinkingPath(): string;
    get askConfigFolderPath(): string;
    get askConfigPath(): string;
    get askResourcesPath(): string;
    get conversationsDirectory(): string;
    get responseDirectory(): string;
    getModelPath(locale: string): string;
}
