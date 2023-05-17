"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoProxy = void 0;
const Jovo_1 = require("./Jovo");
class JovoProxy extends Jovo_1.Jovo {
    constructor(jovo) {
        super(jovo.$app, jovo.$handleRequest, jovo.$platform);
        this.jovo = jovo;
        this.overwritePropertiesToPropagateChangesToJovo();
    }
    // Make `this[key]` reference `this.jovo[key]` for every `key` in `this.jovo`.
    // Without, mutations of `this` would not affect `this.jovo`.
    overwritePropertiesToPropagateChangesToJovo() {
        const keySet = new Set();
        Object.getOwnPropertyNames(Jovo_1.Jovo.prototype).forEach((key) => keySet.add(key));
        Object.keys(this.jovo).forEach((key) => keySet.add(key));
        const keys = Array.from(keySet);
        keys.forEach((key) => {
            if (key !== 'jovo' && key !== 'constructor' && key !== '$component') {
                // if the value is a function just return it as a value and not as getter and setter
                const propertyDescriptor = typeof this.jovo[key] === 'function'
                    ? { value: this.jovo[key].bind(this.jovo) }
                    : {
                        get: () => {
                            return this.jovo[key];
                        },
                        set: (val) => {
                            this.jovo[key] = val;
                        },
                    };
                Object.defineProperty(this, key, propertyDescriptor);
            }
        });
    }
    get $component() {
        return this.jovo.$component;
    }
    toJSON() {
        return Object.assign(Object.assign({}, this), { jovo: undefined });
    }
}
exports.JovoProxy = JovoProxy;
//# sourceMappingURL=JovoProxy.js.map