import { AirtableTable, AirtableTableConfig } from './AirtableTable';
export declare class ObjectArrayTable extends AirtableTable {
    getDefaultConfig(): AirtableTableConfig;
    parse(values: Array<string | string[]>[]): Record<string, unknown>[];
}
