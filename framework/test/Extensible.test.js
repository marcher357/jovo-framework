"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utilities");
describe('constructor', () => {
    test('config with plugins passed: use plugins', () => {
        const instance = new utilities_1.EmptyPlugin();
        const example = new utilities_1.ExampleExtensible({
            plugins: [instance],
        });
        expect(example.plugins.EmptyPlugin).toBe(instance);
    });
});
describe('use', () => {
    test('adds plugin to plugins-object', () => {
        const instance = new utilities_1.EmptyPlugin();
        const example = new utilities_1.ExampleExtensible({
            plugins: [],
        });
        example.use(instance);
        expect(example.plugins.EmptyPlugin).toBe(instance);
    });
});
describe('initializePlugins', () => {
    let extensible;
    test('child: no additional config provided', async () => {
        var _a, _b, _c;
        const plugin = new utilities_1.ExamplePlugin();
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        expect(extensible.plugins.ExamplePlugin).toBe(plugin);
        expect((_a = extensible.config.plugin) === null || _a === void 0 ? void 0 : _a.ExamplePlugin).toBe((_b = extensible.plugins.ExamplePlugin) === null || _b === void 0 ? void 0 : _b.config);
        expect((_c = extensible.plugins.ExamplePlugin) === null || _c === void 0 ? void 0 : _c.config).toEqual(plugin.getDefaultConfig());
    });
    test('child: parent-config provided', async () => {
        var _a, _b, _c;
        const plugin = new utilities_1.ExamplePlugin();
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        if (!extensible.config.plugin) {
            extensible.config.plugin = {};
        }
        if (!extensible.config.plugin.ExamplePlugin) {
            extensible.config.plugin.ExamplePlugin = plugin.getDefaultConfig();
        }
        extensible.config.plugin.ExamplePlugin.text = 'parent';
        await extensible.initialize();
        expect(extensible.plugins.ExamplePlugin).toBe(plugin);
        expect((_a = extensible.config.plugin) === null || _a === void 0 ? void 0 : _a.ExamplePlugin).toBe((_b = extensible.plugins.ExamplePlugin) === null || _b === void 0 ? void 0 : _b.config);
        expect((_c = extensible.plugins.ExamplePlugin) === null || _c === void 0 ? void 0 : _c.config).toEqual({
            text: 'parent',
        });
    });
    test('child: constructor config provided', async () => {
        var _a, _b, _c, _d;
        const plugin = new utilities_1.ExamplePlugin({ text: 'constructor' });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        if ((_a = extensible.config.plugin) === null || _a === void 0 ? void 0 : _a.ExamplePlugin) {
            extensible.config.plugin.ExamplePlugin.text = 'parent';
        }
        await extensible.initialize();
        expect(extensible.plugins.ExamplePlugin).toBe(plugin);
        expect((_b = extensible.config.plugin) === null || _b === void 0 ? void 0 : _b.ExamplePlugin).toBe((_c = extensible.plugins.ExamplePlugin) === null || _c === void 0 ? void 0 : _c.config);
        expect((_d = extensible.plugins.ExamplePlugin) === null || _d === void 0 ? void 0 : _d.config).toEqual({
            text: 'constructor',
        });
    });
    test('config of children are reference to related config-object in root', async () => {
        var _a, _b;
        const plugin = new utilities_1.ExamplePlugin();
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        if ((_a = extensible.config.plugin) === null || _a === void 0 ? void 0 : _a.ExamplePlugin) {
            extensible.config.plugin.ExamplePlugin.text = 'edited';
        }
        expect((_b = extensible.plugins.ExamplePlugin) === null || _b === void 0 ? void 0 : _b.config.text).toEqual('edited');
    });
    test('initialize of children are called if the child has a hook', async () => {
        const plugin = new utilities_1.EmptyPlugin();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        plugin.initialize = jest.fn(async () => { });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        expect(plugin.initialize).toHaveBeenCalledTimes(1);
    });
    test('nested children are initialized', async () => {
        const plugin = new utilities_1.EmptyPlugin();
        const nested = new utilities_1.ExampleExtensible({
            plugins: [plugin],
        });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        plugin.initialize = jest.fn(async () => { });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [nested],
        });
        await extensible.initialize();
        expect(plugin.initialize).toHaveBeenCalledTimes(1);
        expect(extensible.plugins.ExampleExtensible.plugins.EmptyPlugin).toBe(plugin);
    });
});
describe('mountPlugins', () => {
    let extensible;
    test('mount of children are called', async () => {
        const plugin = new utilities_1.EmptyPlugin();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        plugin.mount = jest.fn(async () => { });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        await extensible.mount();
        expect(plugin.mount).toHaveBeenCalledTimes(1);
    });
    test('mount adds plugin to config if none exists', async () => {
        const plugin = new utilities_1.ExamplePlugin();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        plugin.mount = jest.fn(async () => { });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete extensible.config.plugin;
        await extensible.mount();
        expect(plugin.mount).toHaveBeenCalledTimes(1);
    });
    test('config of children are reference to related config-object in root', async () => {
        var _a, _b;
        const plugin = new utilities_1.ExamplePlugin();
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [plugin],
        });
        await extensible.initialize();
        await extensible.mount();
        if ((_a = extensible.config.plugin) === null || _a === void 0 ? void 0 : _a.ExamplePlugin) {
            extensible.config.plugin.ExamplePlugin.text = 'edited';
        }
        expect((_b = extensible.plugins.ExamplePlugin) === null || _b === void 0 ? void 0 : _b.config.text).toEqual('edited');
    });
    test('nested children are mounted', async () => {
        const plugin = new utilities_1.EmptyPlugin();
        const nested = new utilities_1.ExampleExtensible({
            plugins: [plugin],
        });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        plugin.mount = jest.fn(async () => { });
        extensible = new utilities_1.AppLikeExtensible({
            plugins: [nested],
        });
        await extensible.initialize();
        await extensible.mount();
        expect(plugin.mount).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Extensible.test.js.map