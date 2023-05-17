"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyObjectTable = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const AirtableTable_1 = require("./AirtableTable");
class KeyObjectTable extends AirtableTable_1.AirtableTable {
    getDefaultConfig() {
        return {};
    }
    parse(values) {
        const resources = {};
        const headers = values.shift();
        for (const row of values) {
            const key = row[0];
            for (let i = 1; i < headers.length; i++) {
                const cell = row[i];
                (0, lodash_set_1.default)(resources, `${key}.${headers[i]}`, cell);
            }
        }
        return resources;
    }
}
exports.KeyObjectTable = KeyObjectTable;
//# sourceMappingURL=KeyObjectTable.js.map