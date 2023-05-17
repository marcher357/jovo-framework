import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { marshallOptions } from '@aws-sdk/util-dynamodb';
import { DbItem, DbPlugin, DbPluginConfig, HandleRequest, Jovo, PersistableSessionData, PersistableUserData, RequiredOnlyWhere } from '@jovotech/framework';
export interface DynamoDbConfig extends DbPluginConfig {
    table: {
        name: string;
        createTableOnInit?: boolean;
        primaryKeyColumn?: string;
        readCapacityUnits?: number;
        writeCapacityUnits?: number;
        billingMode?: 'PROVISIONED' | 'PAY_PER_REQUEST';
    };
    libraryConfig?: {
        dynamoDbClient?: DynamoDBClientConfig;
        marshall?: marshallOptions;
    };
}
export type DynamoDbInitConfig = RequiredOnlyWhere<DynamoDbConfig, 'table'>;
export interface DynamoDbItem {
    id: string;
    user?: PersistableUserData;
    session?: PersistableSessionData;
    createdAt?: string;
    updatedAt?: string;
}
export declare class DynamoDb extends DbPlugin<DynamoDbConfig> {
    client: DynamoDBClient;
    constructor(config: DynamoDbInitConfig);
    getDefaultConfig(): DynamoDbConfig;
    getInitConfig(): DynamoDbInitConfig;
    mount(parent: HandleRequest): Promise<void> | void;
    initialize(): Promise<void>;
    createTable(): Promise<void>;
    getDbItem(primaryKey: string): Promise<DbItem>;
    loadData(userId: string, jovo: Jovo): Promise<void>;
    saveData(userId: string, jovo: Jovo): Promise<void>;
    checkRequirements(): void | Error;
}
