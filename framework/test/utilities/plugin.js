"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplePlugin = exports.EmptyPlugin = void 0;
const src_1 = require("../../src");
class EmptyPlugin extends src_1.Plugin {
    getDefaultConfig() {
        return {};
    }
}
exports.EmptyPlugin = EmptyPlugin;
class ExamplePlugin extends src_1.Plugin {
    getDefaultConfig() {
        return {
            text: 'default',
        };
    }
}
exports.ExamplePlugin = ExamplePlugin;
//# sourceMappingURL=plugin.js.map