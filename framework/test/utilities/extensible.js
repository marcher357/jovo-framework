"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLikeExtensible = exports.ExampleExtensible = exports.EmptyExtensible = void 0;
const src_1 = require("../../src");
class EmptyExtensible extends src_1.Extensible {
    getDefaultConfig() {
        return {};
    }
    initializeMiddlewareCollection() {
        return new src_1.MiddlewareCollection();
    }
}
exports.EmptyExtensible = EmptyExtensible;
class ExampleExtensible extends src_1.Extensible {
    getDefaultConfig() {
        return {
            text: 'default',
        };
    }
    initializeMiddlewareCollection() {
        return new src_1.MiddlewareCollection();
    }
}
exports.ExampleExtensible = ExampleExtensible;
class AppLikeExtensible extends src_1.Extensible {
    getDefaultConfig() {
        return {};
    }
    initializeMiddlewareCollection() {
        return new src_1.MiddlewareCollection();
    }
    mount() {
        return this.mountPlugins();
    }
    initialize() {
        return this.initializePlugins();
    }
}
exports.AppLikeExtensible = AppLikeExtensible;
//# sourceMappingURL=extensible.js.map