"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensible = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const Plugin_1 = require("./Plugin");
class Extensible extends Plugin_1.Plugin {
    constructor(config) {
        var _a;
        super(config ? Object.assign(Object.assign({}, config), { plugins: undefined }) : config);
        this.middlewareCollection = this.initializeMiddlewareCollection();
        this.plugins = {};
        if ((config === null || config === void 0 ? void 0 : config.plugins) && ((_a = config === null || config === void 0 ? void 0 : config.plugins) === null || _a === void 0 ? void 0 : _a.length)) {
            this.use(...config.plugins);
        }
    }
    use(...plugins) {
        plugins.forEach((plugin) => {
            var _a;
            const name = plugin.name;
            this.plugins[name] = plugin;
            (_a = plugin.install) === null || _a === void 0 ? void 0 : _a.call(plugin, this);
        });
        return this;
    }
    async initializePlugins() {
        var _a, _b, _c;
        // for every child-plugin of this extensible
        for (const key in this.plugins) {
            if (this.plugins.hasOwnProperty(key)) {
                const plugin = this.plugins[key];
                if (!plugin) {
                    continue;
                }
                // merge config, priority: 1. constructor, 2. parent-config, 3. default-config
                const config = plugin.initConfig
                    ? (0, lodash_merge_1.default)({}, ((_a = this.config.plugin) === null || _a === void 0 ? void 0 : _a[key]) || {}, plugin.config)
                    : (0, lodash_merge_1.default)({}, plugin.config, ((_b = this.config.plugin) === null || _b === void 0 ? void 0 : _b[key]) || {});
                // overwrite config, this is just used, because the config-property is readonly
                Object.defineProperty(plugin, 'config', {
                    enumerable: true,
                    value: config,
                });
                // if this extensible has no plugin-config for nested child-plugins, create it
                if (!this.config.plugin) {
                    this.config.plugin = {};
                }
                // make plugin-config of this extensible aware of the child-plugin's config
                // this way the config-tree will be build with correct references
                this.config.plugin[key] = config;
                await ((_c = plugin.initialize) === null || _c === void 0 ? void 0 : _c.call(plugin, this));
                // if the plugin extends Extensible and has installed child-plugins, initialize the plugin's child-plugins
                if (plugin instanceof Extensible && Object.keys(plugin.plugins).length) {
                    await plugin.initializePlugins();
                }
            }
        }
    }
    async mountPlugins() {
        var _a;
        // for every child-plugin of this extensible
        for (const key in this.plugins) {
            if (this.plugins.hasOwnProperty(key)) {
                const plugin = this.plugins[key];
                if (!plugin) {
                    continue;
                }
                // if this extensible has no plugin-config for nested child-plugins, create it
                if (!this.config.plugin) {
                    this.config.plugin = {};
                }
                // make plugin-config of this extensible aware of the child-plugin's config
                // this way the config-tree will be rebuild with correct references
                this.config.plugin[key] = plugin.config;
                await ((_a = plugin.mount) === null || _a === void 0 ? void 0 : _a.call(plugin, this));
                // if the plugin extends Extensible and has installed child-plugins, mount the plugin's child-plugins
                if (plugin instanceof Extensible && plugin.plugins) {
                    await plugin.mountPlugins();
                }
            }
        }
    }
    async dismountPlugins() {
        var _a;
        for (const key in this.plugins) {
            if (this.plugins.hasOwnProperty(key)) {
                const plugin = this.plugins[key];
                if (!plugin) {
                    continue;
                }
                await ((_a = plugin.dismount) === null || _a === void 0 ? void 0 : _a.call(plugin, this));
                if (plugin instanceof Extensible && plugin.plugins) {
                    await plugin.dismountPlugins();
                }
            }
        }
    }
}
exports.Extensible = Extensible;
//# sourceMappingURL=Extensible.js.map