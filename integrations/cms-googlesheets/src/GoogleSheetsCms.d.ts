import { App, Jovo, Plugin, PluginConfig, RequiredOnlyWhere } from '@jovotech/framework';
import { JWTInput } from 'google-auth-library';
import { GoogleSheetsCmsSheet } from './sheets/GoogleSheetsCmsSheet';
export interface GoogleSheetsCmsConfig extends PluginConfig {
    caching?: boolean;
    serviceAccount: JWTInput;
    spreadsheetId: string;
    sheets: Record<string, GoogleSheetsCmsSheet>;
}
export type GoogleSheetsCmsInitConfig = RequiredOnlyWhere<GoogleSheetsCmsConfig, 'serviceAccount' | 'spreadsheetId'>;
export declare class GoogleSheetsCms extends Plugin<GoogleSheetsCmsConfig> {
    private jwt?;
    constructor(config: GoogleSheetsCmsInitConfig);
    getDefaultConfig(): GoogleSheetsCmsConfig;
    getInitConfig(): GoogleSheetsCmsInitConfig;
    install(app: App): void;
    initialize(): Promise<void>;
    retrieveSpreadsheetData(jovo: Jovo): Promise<void>;
    private initializeJWT;
}
