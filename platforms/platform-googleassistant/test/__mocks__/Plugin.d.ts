import { JovoCliPlugin, PluginType } from '@jovotech/cli-core';
import { GoogleCliConfig } from '../../src/cli/utilities';
export declare class Plugin extends JovoCliPlugin {
    readonly id: string;
    readonly type: PluginType;
    readonly config: GoogleCliConfig;
    readonly platformDirectory: string;
    get platformPath(): string;
    get name(): string;
    getDefaultConfig(): GoogleCliConfig;
}
