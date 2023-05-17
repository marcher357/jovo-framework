import { JovoCliPlugin, PluginType } from '@jovotech/cli-core';
import { AlexaCliConfig } from '../../src/cli/interfaces';
export declare class Plugin extends JovoCliPlugin {
    readonly id: string;
    readonly type: PluginType;
    readonly config: AlexaCliConfig;
    readonly platformDirectory: string;
    get name(): string;
    get platformPath(): string;
    get defaultConfig(): AlexaCliConfig;
    get skillPackagePath(): string;
    get skillJsonPath(): string;
    get modelsPath(): string;
    get modelPath(): string;
    get accountLinkingPath(): string;
    get askConfigFolderPath(): string;
    get askConfigPath(): string;
    get askResourcesPath(): string;
    getModelPath(): string;
}
