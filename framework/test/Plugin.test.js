"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utilities");
describe('constructor', () => {
    test('no config provided: use default config', () => {
        const example = new utilities_1.ExamplePlugin();
        expect(example.config).toEqual(example.getDefaultConfig());
    });
    test('config provided: merge with default config', () => {
        const example = new utilities_1.ExamplePlugin({
            text: 'new value',
        });
        expect(example.config).toEqual({
            text: 'new value',
        });
    });
});
//# sourceMappingURL=Plugin.test.js.map