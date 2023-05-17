import { BaseComponent, ComponentPlugin, ComponentPluginConfig, PluginConfig } from '../../src';
export declare class EmptyComponent extends BaseComponent {
}
export interface ExampleComponentConfig extends PluginConfig {
    text: string;
}
export declare class ExampleComponent extends BaseComponent<ExampleComponentConfig> {
    getDefaultConfig(): ExampleComponentConfig;
}
export interface ExampleComponentPluginConfig extends ComponentPluginConfig<ExampleComponent> {
}
export declare class ExampleComponentPlugin extends ComponentPlugin<ExampleComponent, ExampleComponentPluginConfig> {
    readonly component: typeof ExampleComponent;
    getDefaultConfig(): ExampleComponentPluginConfig;
}
