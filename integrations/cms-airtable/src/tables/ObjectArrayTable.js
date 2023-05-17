"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectArrayTable = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const AirtableTable_1 = require("./AirtableTable");
class ObjectArrayTable extends AirtableTable_1.AirtableTable {
    getDefaultConfig() {
        return { range: 'A:Z' };
    }
    parse(values) {
        const resources = [];
        const headers = values.shift();
        for (const row of values) {
            const object = {};
            for (let i = 0; i < headers.length; i++) {
                (0, lodash_set_1.default)(object, headers[i], row[i]);
            }
            resources.push(object);
        }
        return resources;
    }
}
exports.ObjectArrayTable = ObjectArrayTable;
//# sourceMappingURL=ObjectArrayTable.js.map