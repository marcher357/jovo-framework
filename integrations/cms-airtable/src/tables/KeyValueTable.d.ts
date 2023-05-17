import { AirtableTable, AirtableTableConfig } from './AirtableTable';
export declare class KeyValueTable extends AirtableTable {
    getDefaultConfig(): AirtableTableConfig;
    parse(values: unknown[][]): unknown;
}
