"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurable = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
class Configurable {
    constructor(config) {
        this.initConfig = config;
        const defaultConfig = this.getDefaultConfig();
        this.config = config ? (0, lodash_merge_1.default)(defaultConfig, config) : defaultConfig;
    }
    mergeConfig(config) {
        this.config = (0, lodash_merge_1.default)(this.config, config);
    }
    get name() {
        return this.constructor.name;
    }
}
exports.Configurable = Configurable;
//# sourceMappingURL=Configurable.js.map