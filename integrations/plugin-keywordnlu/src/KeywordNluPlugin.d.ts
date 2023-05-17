import { Extensible, Jovo, Plugin, PluginConfig } from '@jovotech/framework';
export interface KeywordMap {
    [locale: string]: Record<string, string>;
}
export interface KeywordNluPluginConfig extends PluginConfig {
    keywordMap: KeywordMap;
    fallbackLocale: string;
}
export declare class KeywordNluPlugin extends Plugin<KeywordNluPluginConfig> {
    getDefaultConfig(): KeywordNluPluginConfig;
    install(app: Extensible): void;
    mount(parent: Extensible): Promise<void> | void;
    protected getLocale(jovo: Jovo): string;
}
