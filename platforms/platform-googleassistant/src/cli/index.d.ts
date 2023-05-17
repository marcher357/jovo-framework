import { JovoCliPlugin, PluginHook, PluginType, RequiredOnlyWhere } from '@jovotech/cli-core';
import { GoogleCliConfig } from './utilities';
export type GoogleCliInitConfig = RequiredOnlyWhere<GoogleCliConfig, 'projectId'>;
export declare class GoogleAssistantCli extends JovoCliPlugin<GoogleCliConfig> {
    constructor(config: GoogleCliInitConfig);
    get id(): string;
    get type(): PluginType;
    get platformDirectory(): string;
    getHooks(): typeof PluginHook[];
    getDefaultConfig(): GoogleCliConfig;
    getInitConfig(): Promise<GoogleCliInitConfig>;
    get name(): string;
    /**
     * Returns base path to platform's build folder
     */
    get platformPath(): string;
}
