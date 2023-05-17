"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDb = exports.JOVO_DEFAULT_COLLECTION_NAME = exports.MONGODB_DEFAULT_DATABASE_NAME = void 0;
const mongodb_1 = require("mongodb");
const framework_1 = require("@jovotech/framework");
const JovoMongoDb_1 = require("./JovoMongoDb");
/** Default database name in MongoDB. if no name was specified, 'test' is used. See https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started */
exports.MONGODB_DEFAULT_DATABASE_NAME = 'test';
exports.JOVO_DEFAULT_COLLECTION_NAME = 'jovoUsers';
class MongoDb extends framework_1.DbPlugin {
    constructor(config) {
        super(config);
        /** A single client promise to be shared by Jovo and others components following MongoDB best practice: https://docs.atlas.mongodb.com/best-practices-connecting-from-aws-lambda/#connection-examples */
        this.client = new mongodb_1.MongoClient(this.config.connectionString, this.config.libraryConfig).connect();
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { connectionString: '<YOUR-MONGODB-URI>', collectionName: exports.JOVO_DEFAULT_COLLECTION_NAME });
    }
    getInitConfig() {
        return { connectionString: '<YOUR-MONGODB-URI>' };
    }
    mount(parent) {
        super.mount(parent);
        parent.middlewareCollection.use('before.request.start', (jovo) => {
            jovo.$mongoDb = new JovoMongoDb_1.JovoMongoDb(this);
        });
    }
    async initialize() {
        if ((await this.getDb()).databaseName === exports.MONGODB_DEFAULT_DATABASE_NAME) {
            // eslint-disable-next-line no-console
            console.warn('[MongoDB] Warning: The "test" database is being used.');
        }
    }
    async loadData(userId, jovo) {
        const users = await this.getCollection();
        const filter = { _id: userId };
        const dbItem = (await users.findOne(filter));
        if (dbItem) {
            jovo.$user.isNew = false;
            jovo.setPersistableData(dbItem, this.config.storedElements);
        }
    }
    async saveData(userId, jovo) {
        const users = await this.getCollection();
        const item = { _id: userId };
        await this.applyPersistableData(jovo, item);
        const filter = { _id: userId };
        await users.updateOne(filter, { $set: item }, { upsert: true });
    }
    /** MongoDB creates the database if doesn't exist yet */
    async getDb() {
        const connection = await this.client;
        if (this.config.databaseName) {
            return connection.db(this.config.databaseName);
        }
        else {
            // If not provided, use database name from connection string.
            return connection.db();
        }
    }
    /** MongoDB creates the collection if doesn't exist yet  */
    async getCollection() {
        const db = await this.getDb();
        return db.collection(this.config.collectionName);
    }
}
exports.MongoDb = MongoDb;
//# sourceMappingURL=MongoDb.js.map