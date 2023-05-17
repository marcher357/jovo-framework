import { MongoDb, MongoDbConfig } from './MongoDb';
import { Collection, Db, Document, MongoClient } from 'mongodb';
export declare class JovoMongoDb {
    readonly mongoDb: MongoDb;
    constructor(mongoDb: MongoDb);
    get config(): MongoDbConfig;
    getClient(): Promise<MongoClient>;
    getDb(): Promise<Db>;
    getCollection(): Promise<Collection<Document>>;
}
