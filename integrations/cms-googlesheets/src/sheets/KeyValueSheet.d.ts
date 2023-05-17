import { GoogleSheetsCmsSheet, GoogleSheetsCmsSheetConfig } from './GoogleSheetsCmsSheet';
export declare class KeyValueSheet extends GoogleSheetsCmsSheet {
    getDefaultConfig(): GoogleSheetsCmsSheetConfig;
    parse(values: unknown[][]): unknown;
}
