import { RequiredOnlyWhere } from '@jovotech/common';
import { MiddlewareCollection } from './MiddlewareCollection';
import { Plugin, PluginConfig } from './Plugin';
export interface ExtensiblePluginConfig {
    [key: string]: object | undefined;
}
export interface ExtensiblePlugins {
    [key: string]: Plugin | undefined;
}
export interface ExtensibleConfig extends PluginConfig {
    plugin?: ExtensiblePluginConfig;
}
export type ExtensibleInitConfig<CONFIG extends ExtensibleConfig = ExtensibleConfig, K extends string = never> = RequiredOnlyWhere<CONFIG, K> & {
    plugin?: never;
    plugins?: Plugin[];
};
export declare abstract class Extensible<CONFIG extends ExtensibleConfig = ExtensibleConfig, MIDDLEWARES extends string[] = string[]> extends Plugin<CONFIG> {
    readonly plugins: ExtensiblePlugins;
    readonly middlewareCollection: MiddlewareCollection<MIDDLEWARES>;
    constructor(config?: ExtensibleInitConfig<CONFIG>);
    abstract initializeMiddlewareCollection(): MiddlewareCollection<MIDDLEWARES>;
    use(...plugins: Plugin[]): this;
    protected initializePlugins(): Promise<void>;
    protected mountPlugins(): Promise<void>;
    protected dismountPlugins(): Promise<void>;
}
