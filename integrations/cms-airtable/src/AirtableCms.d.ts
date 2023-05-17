import { App, Jovo, Plugin, PluginConfig } from '@jovotech/framework';
import { AirtableBase } from 'airtable/lib/airtable_base';
import { AirtableTable } from './tables';
export interface AirtableCmsConfig extends PluginConfig {
    apiKey: string;
    baseId: string;
    caching?: boolean;
    tables: Record<string, AirtableTable>;
}
export declare class AirtableCms extends Plugin<AirtableCmsConfig> {
    airtableBase: AirtableBase;
    getDefaultConfig(): AirtableCmsConfig;
    install(app: App): void;
    retrieveAirtableData(jovo: Jovo): Promise<void>;
}
