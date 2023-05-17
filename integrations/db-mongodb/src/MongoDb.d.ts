import { Collection, Db, Document, MongoClient, MongoClientOptions } from 'mongodb';
import { DbPlugin, DbPluginConfig, HandleRequest, Jovo, PersistableSessionData, PersistableUserData, RequiredOnlyWhere } from '@jovotech/framework';
export interface MongoDbConfig extends DbPluginConfig {
    /** Specify username, password and clusterUrl. Additional parameters can also be added. See https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#connection-uri for more details */
    connectionString: string;
    /** The name of the database we want to use. If not provided, use database name from connection string. If not provided in connection string, 'test' is used. A new database is created if doesn't exist yet. */
    databaseName?: string;
    /** A new collection is created with that name if doesn't exist yet. */
    collectionName?: string;
    /** Client options for the official `mongodb` package that is used */
    libraryConfig?: MongoClientOptions;
}
export type MongoDbInitConfig = RequiredOnlyWhere<MongoDbConfig, 'connectionString'>;
export interface MongoDbItem {
    id: string;
    user?: PersistableUserData;
    session?: PersistableSessionData;
    createdAt?: string;
    updatedAt?: string;
}
/** Default database name in MongoDB. if no name was specified, 'test' is used. See https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started */
export declare const MONGODB_DEFAULT_DATABASE_NAME = "test";
export declare const JOVO_DEFAULT_COLLECTION_NAME = "jovoUsers";
export declare class MongoDb extends DbPlugin<MongoDbConfig> {
    /** A single client promise to be shared by Jovo and others components following MongoDB best practice: https://docs.atlas.mongodb.com/best-practices-connecting-from-aws-lambda/#connection-examples */
    readonly client: Promise<MongoClient>;
    constructor(config: MongoDbInitConfig);
    getDefaultConfig(): MongoDbConfig;
    getInitConfig(): MongoDbInitConfig;
    mount(parent: HandleRequest): Promise<void> | void;
    initialize(): Promise<void>;
    loadData(userId: string, jovo: Jovo): Promise<void>;
    saveData(userId: string, jovo: Jovo): Promise<void>;
    /** MongoDB creates the database if doesn't exist yet */
    getDb(): Promise<Db>;
    /** MongoDB creates the collection if doesn't exist yet  */
    getCollection(): Promise<Collection<Document>>;
}
