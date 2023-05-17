import { JovoCliPlugin, PluginHook, PluginType } from '@jovotech/cli-core';
import { DialogflowConfig } from './utilities';
export declare class DialogflowCli extends JovoCliPlugin {
    readonly id: string;
    readonly type: PluginType;
    readonly config: DialogflowConfig;
    readonly platformDirectory: string;
    constructor(config?: DialogflowConfig);
    getHooks(): typeof PluginHook[];
    get platformPath(): string;
    get agentJsonPath(): string;
    get packageJsonPath(): string;
    get intentsFolderPath(): string;
    get entitiesFolderPath(): string;
}
