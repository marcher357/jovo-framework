"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
class Middleware {
    constructor(name) {
        this.name = name;
        this.enabled = true;
        this.fns = [];
    }
    use(...fns) {
        this.fns.push(...fns);
        return this;
    }
    async run(jovo, payload) {
        if (!this.enabled) {
            return;
        }
        for (let i = 0, len = this.fns.length; i < len; i++) {
            await this.fns[i](jovo, payload);
        }
    }
    remove(fn) {
        const index = this.fns.indexOf(fn);
        if (index >= 0) {
            this.fns.splice(index, 1);
        }
        return this;
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map