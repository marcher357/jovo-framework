"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoSanity = void 0;
const framework_1 = require("@jovotech/framework");
const client_1 = __importDefault(require("@sanity/client"));
class JovoSanity {
    constructor(sanityCms, jovo) {
        this.sanityCms = sanityCms;
        this.jovo = jovo;
        this.client = new client_1.default(this.config.client);
    }
    get config() {
        return this.sanityCms.config;
    }
    async load(queryKeys) {
        const names = Array.isArray(queryKeys) ? queryKeys : [queryKeys];
        const promises = [];
        for (const [name, value] of Object.entries(this.config.queries)) {
            if (names.includes(name)) {
                const transformer = typeof value === 'string' ? null : value;
                const query = transformer ? transformer.config.query : value;
                if (!query)
                    continue;
                promises.push({ name, transformer, query, data: this.client.fetch(query) });
            }
        }
        if (promises.length > 0) {
            const allPromises = await Promise.all(promises);
            for (const p of allPromises) {
                try {
                    const data = await p.data;
                    if (p.transformer) {
                        this.jovo.$cms[p.name] = p.transformer.execute(data, this.jovo);
                    }
                    else {
                        this.jovo.$cms[p.name] = data;
                    }
                }
                catch (error) {
                    throw new framework_1.JovoError({ message: error.message });
                }
            }
        }
    }
}
exports.JovoSanity = JovoSanity;
//# sourceMappingURL=JovoSanity.js.map