import { AirtableTable, AirtableTableConfig } from './AirtableTable';
export declare class KeyObjectTable extends AirtableTable {
    getDefaultConfig(): AirtableTableConfig;
    parse(values: Array<string | string[]>[]): unknown;
}
