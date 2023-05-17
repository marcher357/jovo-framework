"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyObjectQueryTransformer = void 0;
const BaseSanityQueryTransformer_1 = require("./BaseSanityQueryTransformer");
class KeyObjectQueryTransformer extends BaseSanityQueryTransformer_1.BaseSanityQueryTransformer {
    constructor() {
        super(...arguments);
        this.convertArrayToObject = (array, key) => array.reduce((acc, curr) => {
            acc[curr[key]] = curr;
            return acc;
        }, {});
    }
    getDefaultConfig() {
        return {
            query: '',
            key: '_id',
        };
    }
    execute(values, jovo) {
        if (Array.isArray(values)) {
            return this.convertArrayToObject(values, this.config.key);
        }
        if (Object.keys(values).includes(this.config.key)) {
            const result = {};
            result[this.config.key] = values;
            return result;
        }
        else {
            return {};
        }
    }
}
exports.KeyObjectQueryTransformer = KeyObjectQueryTransformer;
//# sourceMappingURL=KeyObjectQueryTransformer.js.map