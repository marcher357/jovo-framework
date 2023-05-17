import { DbItem, DbPlugin, DbPluginConfig, DeepPartial, Jovo } from '@jovotech/framework';
export interface FileDbConfig extends DbPluginConfig {
    pathToFile: string;
    primaryKeyColumn?: string;
}
export type FileDbInitConfig = DeepPartial<FileDbConfig>;
export declare class FileDb extends DbPlugin<FileDbConfig> {
    constructor(config?: FileDbInitConfig);
    getDefaultConfig(): FileDbConfig;
    get pathToFile(): string;
    initialize(): Promise<void>;
    getDbItem(primaryKey: string): Promise<DbItem>;
    loadData(userId: string, jovo: Jovo): Promise<void>;
    saveData(userId: string, jovo: Jovo): Promise<void>;
}
