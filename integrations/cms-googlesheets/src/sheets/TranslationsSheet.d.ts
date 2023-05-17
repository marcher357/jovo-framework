import { Jovo } from '@jovotech/framework';
import { GoogleSheetsCmsSheet, GoogleSheetsCmsSheetConfig } from './GoogleSheetsCmsSheet';
export interface Resources {
    [key: string]: string | string[] | Resources;
}
export declare class TranslationsSheet extends GoogleSheetsCmsSheet {
    getDefaultConfig(): GoogleSheetsCmsSheetConfig;
    parse(values: string[][], jovo: Jovo): Record<string, Resources>;
}
