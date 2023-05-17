import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { TtsCachePlugin, TtsCachePluginConfig, TtsData, RequiredOnlyWhere } from '@jovotech/framework';
export interface S3TtsCacheConfig extends TtsCachePluginConfig {
    bucket: string;
    path: string;
    libraryConfig?: S3ClientConfig;
}
export type S3TtsCacheInitConfig = RequiredOnlyWhere<S3TtsCacheConfig, 'bucket' | 'path'>;
export declare class S3TtsCache extends TtsCachePlugin<S3TtsCacheConfig> {
    readonly client: S3Client;
    constructor(config: S3TtsCacheInitConfig);
    get baseUrl(): string;
    getInitConfig(): S3TtsCacheInitConfig;
    getDefaultConfig(): S3TtsCacheConfig;
    getItem(key: string, locale: string, fileExtension: string): Promise<TtsData | undefined>;
    private buildHeadCommand;
    private buildGetCommand;
    storeItem(key: string, locale: string, data: TtsData): Promise<string | undefined>;
    private getFilePath;
}
