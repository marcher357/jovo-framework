"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.APP_MIDDLEWARES = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const _1 = require(".");
const MatchingPlatformNotFoundError_1 = require("./errors/MatchingPlatformNotFoundError");
const Extensible_1 = require("./Extensible");
const HandleRequest_1 = require("./HandleRequest");
const I18Next_1 = require("./I18Next");
const MiddlewareCollection_1 = require("./MiddlewareCollection");
const Platform_1 = require("./Platform");
const BasicLogging_1 = require("./plugins/BasicLogging");
const HandlerPlugin_1 = require("./plugins/HandlerPlugin");
const OutputPlugin_1 = require("./plugins/OutputPlugin");
const RouterPlugin_1 = require("./plugins/RouterPlugin");
exports.APP_MIDDLEWARES = [
    'request.start',
    'request',
    'request.end',
    'interpretation.start',
    'interpretation.asr',
    'interpretation.nlu',
    'interpretation.end',
    'dialogue.start',
    'dialogue.router',
    'dialogue.logic',
    'dialogue.end',
    'response.start',
    'response.output',
    'response.tts',
    'response.end',
];
class App extends Extensible_1.Extensible {
    constructor(config) {
        super(config ? Object.assign(Object.assign({}, config), { components: undefined }) : config);
        this.initialized = false;
        this.errorListeners = [];
        // @see https://www.jovo.tech/docs/data#app-data
        this.data = {};
        // @see https://www.jovo.tech/docs/cms
        this.cms = {};
        if (typeof this.config.logging === 'object' && this.config.logging.logger) {
            (0, lodash_merge_1.default)(_1.Logger.config, this.config.logging.logger);
        }
        this.onError((error) => {
            _1.Logger.error(error);
        });
        this.use(new RouterPlugin_1.RouterPlugin(), new HandlerPlugin_1.HandlerPlugin(), new OutputPlugin_1.OutputPlugin());
        this.componentTree = new _1.ComponentTree(...((config === null || config === void 0 ? void 0 : config.components) || []));
        this.i18n = new I18Next_1.I18Next(this.config.i18n);
    }
    get isInitialized() {
        return this.initialized;
    }
    get platforms() {
        return Object.values(this.plugins).filter((plugin) => plugin instanceof Platform_1.Platform);
    }
    configure(config) {
        (0, lodash_merge_1.default)(this.config, Object.assign(Object.assign({}, config), { components: undefined, plugins: undefined }));
        const usables = [...((config === null || config === void 0 ? void 0 : config.plugins) || []), ...((config === null || config === void 0 ? void 0 : config.components) || [])];
        this.use(...usables);
    }
    onError(listener) {
        if (this.errorListeners.includes(listener)) {
            return;
        }
        this.errorListeners.push(listener);
    }
    addErrorListener(listener) {
        return this.onError(listener);
    }
    removeErrorListener(listener) {
        const index = this.errorListeners.indexOf(listener);
        if (index >= 0) {
            this.errorListeners.splice(index, 1);
        }
    }
    initializeMiddlewareCollection() {
        return new MiddlewareCollection_1.MiddlewareCollection(...exports.APP_MIDDLEWARES);
    }
    middleware(name) {
        return this.middlewareCollection.get(name);
    }
    hook(name, fn) {
        this.middlewareCollection.use(name, fn);
    }
    getDefaultConfig() {
        return {
            logging: true,
        };
    }
    async initialize() {
        if (this.initialized) {
            return;
        }
        if (typeof this.config.logging === 'boolean' && this.config.logging) {
            this.use(new BasicLogging_1.BasicLogging({ request: true, response: true }));
        }
        else if (typeof this.config.logging === 'object') {
            if (this.config.logging.logger) {
                (0, lodash_merge_1.default)(_1.Logger.config, this.config.logging.logger);
            }
            this.use(new BasicLogging_1.BasicLogging(this.config.logging));
        }
        try {
            await this.componentTree.initialize();
            await this.i18n.initialize();
            await this.initializePlugins();
            this.initialized = true;
        }
        catch (e) {
            return this.handleError(e);
        }
    }
    use(...usables) {
        const plugins = usables.filter((usable) => {
            if (!(usable instanceof _1.Plugin)) {
                return false;
            }
            if ((process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) &&
                usable.config.skipTests) {
                return false;
            }
            return true;
        });
        if (plugins.length) {
            super.use(...plugins);
        }
        const components = usables.filter((usable) => !(usable instanceof _1.Plugin));
        if (components.length) {
            this.componentTree.add(...components);
        }
        return this;
    }
    async handle(server) {
        try {
            const handleRequest = new HandleRequest_1.HandleRequest(this, server);
            await handleRequest.mount();
            const relatedPlatform = handleRequest.platforms.find((platform) => platform.isRequestRelated(server.getRequestObject()));
            if (!relatedPlatform) {
                throw new MatchingPlatformNotFoundError_1.MatchingPlatformNotFoundError(server.getRequestObject());
            }
            handleRequest.platform = relatedPlatform;
            const jovo = relatedPlatform.createJovoInstance(this, handleRequest);
            // RIDR-pipeline
            await handleRequest.middlewareCollection.run(exports.APP_MIDDLEWARES.slice(), jovo);
            await handleRequest.dismount();
            // TODO determine what to do if there is not response
            if (!jovo.$response) {
                return;
            }
            // use handleRequest.server instead of server in order to allow a request-related server instance to be used
            await handleRequest.server.setResponse(jovo.$response);
        }
        catch (e) {
            await this.handleError(e);
            return server.fail(e);
        }
    }
    async handleError(error, jovo) {
        var _a;
        const errorInstance = error instanceof Error ? error : new Error(error);
        if (!((_a = this.errorListeners) === null || _a === void 0 ? void 0 : _a.length)) {
            throw error;
        }
        for (const listener of this.errorListeners) {
            await listener(errorInstance, jovo);
        }
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map