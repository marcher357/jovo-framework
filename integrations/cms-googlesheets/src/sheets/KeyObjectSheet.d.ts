import { GoogleSheetsCmsSheet, GoogleSheetsCmsSheetConfig } from './GoogleSheetsCmsSheet';
export declare class KeyObjectSheet extends GoogleSheetsCmsSheet {
    getDefaultConfig(): GoogleSheetsCmsSheetConfig;
    parse(values: Array<string | string[]>[]): unknown;
}
