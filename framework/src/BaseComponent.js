"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = exports.ComponentDeclaration = void 0;
const JovoProxy_1 = require("./JovoProxy");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ComponentDeclaration {
    constructor(component, options) {
        this.component = component;
        this.options = options;
    }
}
exports.ComponentDeclaration = ComponentDeclaration;
class BaseComponent extends JovoProxy_1.JovoProxy {
    constructor(jovo, options) {
        super(jovo);
        this.options = options;
    }
    get $component() {
        var _a;
        return {
            data: this.jovo.$component.data,
            config: Object.assign(Object.assign({}, (((_a = this.options) === null || _a === void 0 ? void 0 : _a.config) || {})), (this.jovo.$component.config || {})),
        };
    }
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=BaseComponent.js.map