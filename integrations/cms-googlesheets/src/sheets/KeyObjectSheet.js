"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyObjectSheet = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const GoogleSheetsCmsSheet_1 = require("./GoogleSheetsCmsSheet");
class KeyObjectSheet extends GoogleSheetsCmsSheet_1.GoogleSheetsCmsSheet {
    getDefaultConfig() {
        return { range: 'A:Z' };
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
exports.KeyObjectSheet = KeyObjectSheet;
//# sourceMappingURL=KeyObjectSheet.js.map