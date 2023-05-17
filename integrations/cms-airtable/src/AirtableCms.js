"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtableCms = void 0;
const framework_1 = require("@jovotech/framework");
const airtable_1 = __importDefault(require("airtable"));
class AirtableCms extends framework_1.Plugin {
    getDefaultConfig() {
        return {
            apiKey: '',
            baseId: '',
            tables: {},
        };
    }
    install(app) {
        app.middlewareCollection.use('request.start', this.retrieveAirtableData.bind(this));
        if (!this.config.apiKey) {
            throw new framework_1.JovoError({
                message: 'apiKey has to be set',
                hint: 'You can find your api key on https://airtable.com/account',
                learnMore: 'https://www.jovo.tech/marketplace/cms-airtable#configuration',
            });
        }
        if (!this.config.baseId) {
            throw new framework_1.JovoError({
                message: 'baseId has to bet set',
                hint: 'You can find your baseId on https://airtable.com/api',
                learnMore: 'https://www.jovo.tech/marketplace/cms-airtable#configuration',
            });
        }
        this.airtableBase = new airtable_1.default({ apiKey: this.config.apiKey }).base(this.config.baseId);
    }
    async retrieveAirtableData(jovo) {
        var _a, _b, _c, _d;
        for (const [tableName, table] of Object.entries(this.config.tables)) {
            // Cache cms data, if not configured otherwise
            if ((this.config.caching !== false || table.config.caching !== false) &&
                jovo.$cms[tableName]) {
                continue;
            }
            const records = await this.airtableBase(tableName)
                .select(table.config.selectOptions)
                .all();
            const values = [];
            const keys = table.config.order ||
                ((_a = table.config.selectOptions) === null || _a === void 0 ? void 0 : _a.fields) ||
                ((_c = (_b = table.config.selectOptions) === null || _b === void 0 ? void 0 : _b.sort) === null || _c === void 0 ? void 0 : _c.map((el) => el.field)) ||
                Object.keys(((_d = records.find((record) => Object.keys(record.fields).length)) === null || _d === void 0 ? void 0 : _d.fields) || []);
            if (!keys.length) {
                continue;
            }
            values.push(keys);
            for (const record of records) {
                const recordValues = [];
                for (const key of keys) {
                    recordValues.push(record.fields[key]);
                }
                values.push(recordValues);
            }
            const parsed = table.parse(values, jovo);
            jovo.$cms[tableName] = parsed;
        }
    }
}
exports.AirtableCms = AirtableCms;
//# sourceMappingURL=AirtableCms.js.map