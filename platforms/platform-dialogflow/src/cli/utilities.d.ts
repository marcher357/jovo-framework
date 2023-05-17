export * from './interfaces';
export * from './constants';
export declare function activateServiceAccount(keyFilePath: string): Promise<void>;
export declare function getGcloudAccessToken(): Promise<string>;
