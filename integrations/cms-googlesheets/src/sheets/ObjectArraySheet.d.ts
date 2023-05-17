import { GoogleSheetsCmsSheet, GoogleSheetsCmsSheetConfig } from './GoogleSheetsCmsSheet';
export declare class ObjectArraySheet extends GoogleSheetsCmsSheet {
    getDefaultConfig(): GoogleSheetsCmsSheetConfig;
    parse(values: Array<string | string[]>[]): Record<string, unknown>[];
}
