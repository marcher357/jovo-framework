import { Jovo } from '@jovotech/framework';
import { AirtableTable, AirtableTableConfig } from './AirtableTable';
export interface Resources {
    [key: string]: string | string[] | Resources;
}
export declare class TranslationsTable extends AirtableTable {
    getDefaultConfig(): AirtableTableConfig;
    parse(values: string[][], jovo: Jovo): Record<string, Resources>;
}
