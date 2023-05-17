import { Plugin, PluginConfig } from '../../src';
export declare class EmptyPlugin extends Plugin {
    getDefaultConfig(): PluginConfig;
}
export interface ExamplePluginConfig extends PluginConfig {
    text: string;
}
declare module '../../src' {
    interface ExtensiblePluginConfig {
        ExamplePlugin?: ExamplePluginConfig;
    }
}
export declare class ExamplePlugin extends Plugin<ExamplePluginConfig> {
    getDefaultConfig(): ExamplePluginConfig;
}
