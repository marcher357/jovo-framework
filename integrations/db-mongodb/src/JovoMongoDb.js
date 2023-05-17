"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoMongoDb = void 0;
class JovoMongoDb {
    constructor(mongoDb) {
        this.mongoDb = mongoDb;
    }
    get config() {
        return this.mongoDb.config;
    }
    getClient() {
        return this.mongoDb.client;
    }
    getDb() {
        return this.mongoDb.getDb();
    }
    getCollection() {
        return this.mongoDb.getCollection();
    }
}
exports.JovoMongoDb = JovoMongoDb;
//# sourceMappingURL=JovoMongoDb.js.map