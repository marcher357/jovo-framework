import { App, Jovo, Plugin, PluginConfig } from '@jovotech/framework';
import { BaseSanityQueryTransformer } from './transformers';
export interface SanityCmsConfig extends PluginConfig {
    client: {
        projectId: string;
        dataset: string;
        apiVersion: string;
        token: string;
        useCdn: boolean;
    };
    queries: Record<string, string | BaseSanityQueryTransformer>;
    autoLoad?: string[];
}
export declare class SanityCms extends Plugin<SanityCmsConfig> {
    getDefaultConfig(): SanityCmsConfig;
    install(app: App): void;
    retrieveSanityData(jovo: Jovo): Promise<void>;
}
