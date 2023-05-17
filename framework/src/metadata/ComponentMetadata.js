"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentMetadata = void 0;
const ClassDecoratorMetadata_1 = require("./ClassDecoratorMetadata");
class ComponentMetadata extends ClassDecoratorMetadata_1.ClassDecoratorMetadata {
    constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target, options = {}) {
        super(target);
        this.target = target;
        this.options = options;
    }
    get isGlobal() {
        return !!this.options.global;
    }
    mergeWith(otherMetadata) {
        for (const key in otherMetadata.options) {
            if (otherMetadata.options.hasOwnProperty(key) && otherMetadata.options[key]) {
                const valueToMergeIn = otherMetadata.options[key];
                if (Array.isArray(valueToMergeIn) && Array.isArray(this.options[key])) {
                    this.options[key].push(...valueToMergeIn);
                }
                else if (typeof valueToMergeIn === 'function' &&
                    typeof this.options[key] === 'function') {
                    // TODO: check if this is necessary: it is experimental
                    const currentFunction = this.options[key];
                    this.options[key] = async function (...args) {
                        const currentResult = await currentFunction.call(this, ...args);
                        const newResult = await valueToMergeIn.call(this, ...args);
                        return currentResult && newResult;
                    };
                }
                else {
                    this.options[key] = valueToMergeIn;
                }
            }
        }
        return this;
    }
}
exports.ComponentMetadata = ComponentMetadata;
//# sourceMappingURL=ComponentMetadata.js.map