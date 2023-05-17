"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectArraySheet = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const GoogleSheetsCmsSheet_1 = require("./GoogleSheetsCmsSheet");
class ObjectArraySheet extends GoogleSheetsCmsSheet_1.GoogleSheetsCmsSheet {
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
exports.ObjectArraySheet = ObjectArraySheet;
//# sourceMappingURL=ObjectArraySheet.js.map