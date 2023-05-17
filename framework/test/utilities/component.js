"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleComponentPlugin = exports.ExampleComponent = exports.EmptyComponent = void 0;
const src_1 = require("../../src");
class EmptyComponent extends src_1.BaseComponent {
}
exports.EmptyComponent = EmptyComponent;
class ExampleComponent extends src_1.BaseComponent {
    getDefaultConfig() {
        return {
            text: 'default',
        };
    }
}
exports.ExampleComponent = ExampleComponent;
class ExampleComponentPlugin extends src_1.ComponentPlugin {
    constructor() {
        super(...arguments);
        this.component = ExampleComponent;
    }
    getDefaultConfig() {
        return {};
    }
}
exports.ExampleComponentPlugin = ExampleComponentPlugin;
//# sourceMappingURL=component.js.map