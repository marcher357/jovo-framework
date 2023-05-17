"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyValueTable = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const AirtableTable_1 = require("./AirtableTable");
class KeyValueTable extends AirtableTable_1.AirtableTable {
    getDefaultConfig() {
        return {};
    }
    parse(values) {
        const resources = {};
        values.shift();
        for (const row of values) {
            const key = row.shift();
            for (const cell of row) {
                (0, lodash_set_1.default)(resources, key, cell);
            }
        }
        return resources;
    }
}
exports.KeyValueTable = KeyValueTable;
//# sourceMappingURL=KeyValueTable.js.map