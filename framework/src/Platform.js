"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const _1 = require(".");
const Extensible_1 = require("./Extensible");
const MiddlewareCollection_1 = require("./MiddlewareCollection");
class Platform extends Extensible_1.Extensible {
    initializeMiddlewareCollection() {
        return new MiddlewareCollection_1.MiddlewareCollection(..._1.APP_MIDDLEWARES);
    }
    mount(parent) {
        var _a, _b, _c;
        if (!(parent instanceof _1.HandleRequest)) {
            throw new _1.InvalidParentError(this.name, _1.HandleRequest);
        }
        // propagate runs of middlewares of parent to middlewares of this
        this.middlewareCollection.names.forEach((middlewareName) => {
            parent.middlewareCollection.use(middlewareName, async (jovo) => {
                var _a;
                if (((_a = jovo.$platform) === null || _a === void 0 ? void 0 : _a.name) !== this.name) {
                    return;
                }
                return this.middlewareCollection.run(middlewareName, jovo);
            });
        });
        const appOutputConfig = parent.config.output;
        this.outputTemplateConverterStrategy.config.validation =
            (_a = appOutputConfig === null || appOutputConfig === void 0 ? void 0 : appOutputConfig.validation) !== null && _a !== void 0 ? _a : this.outputTemplateConverterStrategy.config.validation;
        this.outputTemplateConverterStrategy.config.sanitization =
            (_b = appOutputConfig === null || appOutputConfig === void 0 ? void 0 : appOutputConfig.sanitization) !== null && _b !== void 0 ? _b : this.outputTemplateConverterStrategy.config.sanitization;
        this.outputTemplateConverterStrategy.config.omitWarnings =
            (_c = appOutputConfig === null || appOutputConfig === void 0 ? void 0 : appOutputConfig.omitWarnings) !== null && _c !== void 0 ? _c : this.outputTemplateConverterStrategy.config.omitWarnings;
    }
    createJovoInstance(app, handleRequest) {
        return new this.jovoClass(app, handleRequest, handleRequest.platform);
    }
    createRequestInstance(request) {
        const instance = new this.requestClass();
        (0, lodash_merge_1.default)(instance, request);
        return instance;
    }
    createUserInstance(jovo) {
        return new this.userClass(jovo);
    }
    createDeviceInstance(jovo) {
        return new this.deviceClass(jovo);
    }
    enableDatabaseSessionStorage(jovo, sessionConfig) {
        const dbPlugins = Object.values(jovo.$handleRequest.plugins).filter((plugin) => plugin instanceof _1.DbPlugin);
        if (!dbPlugins.length) {
            // eslint-disable-next-line no-console
            console.warn('No database plugin is installed. Session storage can not be enabled.');
        }
        dbPlugins.forEach((dbPlugin) => {
            if (!dbPlugin.config.storedElements) {
                dbPlugin.config.storedElements = dbPlugin.getDefaultConfig().storedElements || {};
            }
            // eslint-disable-next-line no-console
            console.warn(`Session storage was enabled for database plugin ${dbPlugin.name}`);
            if (sessionConfig) {
                dbPlugin.config.storedElements.session = Object.assign(Object.assign({}, sessionConfig), { enabled: true });
            }
            else {
                dbPlugin.config.storedElements.session = true;
            }
        });
    }
}
exports.Platform = Platform;
//# sourceMappingURL=Platform.js.map