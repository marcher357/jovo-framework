"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDb = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const framework_1 = require("@jovotech/framework");
class DynamoDb extends framework_1.DbPlugin {
    constructor(config) {
        var _a;
        super(config);
        this.client = new client_dynamodb_1.DynamoDBClient(((_a = this.config.libraryConfig) === null || _a === void 0 ? void 0 : _a.dynamoDbClient) || {});
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { table: {
                name: '<YOUR-TABLE-NAME>',
                primaryKeyColumn: 'userId',
                createTableOnInit: true,
                readCapacityUnits: 2,
                writeCapacityUnits: 2,
                billingMode: 'PROVISIONED',
            }, libraryConfig: {
                marshall: {
                    removeUndefinedValues: true,
                    convertClassInstanceToMap: true,
                },
            } });
    }
    getInitConfig() {
        return { table: { name: '<YOUR-TABLE-NAME>' } };
    }
    mount(parent) {
        var _a;
        super.mount(parent);
        // initialize a new client for the mounted instance with the given request-config
        this.client = new client_dynamodb_1.DynamoDBClient(((_a = this.config.libraryConfig) === null || _a === void 0 ? void 0 : _a.dynamoDbClient) || {});
    }
    async initialize() {
        try {
            const params = {
                TableName: this.config.table.name,
            };
            const command = new client_dynamodb_1.DescribeTableCommand(params);
            await this.client.send(command);
        }
        catch (e) {
            if (e.name === 'ResourceNotFoundException') {
                if (this.config.table.createTableOnInit) {
                    await this.createTable();
                    throw new Error('Creating a table. Please wait a moment and resend the request...');
                }
                else {
                    throw new Error(`Table ${this.config.table.name} does not exist and setting up a table automatically deactivated. Please setup a table manually.`);
                }
            }
            throw e;
        }
    }
    async createTable() {
        const params = {
            AttributeDefinitions: [
                {
                    AttributeName: this.config.table.primaryKeyColumn,
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: this.config.table.primaryKeyColumn,
                    KeyType: 'HASH',
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: this.config.table.readCapacityUnits,
                WriteCapacityUnits: this.config.table.writeCapacityUnits,
            },
            BillingMode: this.config.table.billingMode,
            TableName: this.config.table.name,
        };
        await this.client.send(new client_dynamodb_1.CreateTableCommand(params));
    }
    async getDbItem(primaryKey) {
        const params = {
            ConsistentRead: true,
            Key: {
                [this.config.table.primaryKeyColumn]: { S: primaryKey },
            },
            TableName: this.config.table.name,
        };
        const data = await this.client.send(new client_dynamodb_1.GetItemCommand(params));
        return data.Item;
    }
    async loadData(userId, jovo) {
        this.checkRequirements();
        const dbItem = await this.getDbItem(userId);
        if (dbItem) {
            jovo.$user.isNew = false;
            jovo.setPersistableData((0, util_dynamodb_1.unmarshall)(dbItem), this.config.storedElements);
        }
    }
    async saveData(userId, jovo) {
        var _a;
        this.checkRequirements();
        const params = {
            Item: {
                [this.config.table.primaryKeyColumn]: userId,
            },
            TableName: this.config.table.name,
        };
        const item = {
            [this.config.table.primaryKeyColumn]: userId,
        };
        await this.applyPersistableData(jovo, item);
        await this.client.send(new client_dynamodb_1.PutItemCommand({
            TableName: params.TableName,
            Item: (0, util_dynamodb_1.marshall)(item, (_a = this.config.libraryConfig) === null || _a === void 0 ? void 0 : _a.marshall),
        }));
    }
    checkRequirements() {
        if (!this.config.table.primaryKeyColumn) {
            throw new Error('this.config.table.primaryKeyColumn must not be undefined');
        }
        if (!this.config.table.name) {
            throw new Error('this.config.table.name must not be undefined');
        }
    }
}
exports.DynamoDb = DynamoDb;
//# sourceMappingURL=DynamoDb.js.map