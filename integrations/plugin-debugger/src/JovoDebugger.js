"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoDebugger = exports.JovoDebuggerPlatform = exports.getDefaultLanguageMap = void 0;
const framework_1 = require("@jovotech/framework");
const nlu_nlpjs_1 = require("@jovotech/nlu-nlpjs");
const platform_core_1 = require("@jovotech/platform-core");
const lang_de_1 = require("@nlpjs/lang-de");
const lang_en_1 = require("@nlpjs/lang-en");
const lang_es_1 = require("@nlpjs/lang-es");
const lang_fr_1 = require("@nlpjs/lang-fr");
const lang_it_1 = require("@nlpjs/lang-it");
const es6_1 = __importDefault(require("fast-deep-equal/es6"));
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const process_1 = require("process");
const socket_io_client_1 = require("socket.io-client");
const util_1 = require("util");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const DebuggerConfig_1 = require("./DebuggerConfig");
const enums_1 = require("./enums");
const LanguageModelDirectoryNotFoundError_1 = require("./errors/LanguageModelDirectoryNotFoundError");
const SocketConnectionFailedError_1 = require("./errors/SocketConnectionFailedError");
const SocketNotConnectedError_1 = require("./errors/SocketNotConnectedError");
const WebhookIdNotFoundError_1 = require("./errors/WebhookIdNotFoundError");
const MockServer_1 = require("./MockServer");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
function getDefaultLanguageMap() {
    return {
        de: lang_de_1.LangDe,
        en: lang_en_1.LangEn,
        es: lang_es_1.LangEs,
        fr: lang_fr_1.LangFr,
        it: lang_it_1.LangIt,
    };
}
exports.getDefaultLanguageMap = getDefaultLanguageMap;
class JovoDebuggerPlatform extends platform_core_1.CorePlatform {
}
exports.JovoDebuggerPlatform = JovoDebuggerPlatform;
class JovoDebugger extends framework_1.Plugin {
    constructor() {
        super(...arguments);
        this.hasOverriddenWrite = false;
        this.hasShownConnectionError = false;
    }
    getDefaultConfig() {
        return {
            skipTests: true,
            nlu: new nlu_nlpjs_1.NlpjsNlu({
                languageMap: getDefaultLanguageMap(),
            }),
            webhookUrl: 'https://webhook.jovo.cloud',
            enabled: (process.argv.includes('--jovo-webhook') || process.argv.includes('--webhook')) &&
                !process.argv.includes('--disable-jovo-debugger'),
            debuggerConfigPath: './jovo.debugger.js',
            modelsPath: './models',
            ignoredProperties: ['$app', '$handleRequest', '$platform'],
            plugins: [],
        };
    }
    install(parent) {
        if (!(parent instanceof framework_1.App)) {
            throw new framework_1.InvalidParentError(this.name, framework_1.App);
        }
        this.installDebuggerPlatform(parent);
    }
    installDebuggerPlatform(app) {
        const plugins = this.config.plugins || [];
        app.use(new JovoDebuggerPlatform({
            platform: 'jovo-debugger',
            plugins: [this.config.nlu, ...plugins],
        }));
    }
    async initialize(app) {
        if (this.config.enabled === false)
            return;
        this.socket = await this.connectToWebhook();
        this.socket.on(enums_1.JovoDebuggerEvent.DebuggingAvailable, () => {
            return this.onDebuggingAvailable();
        });
        this.socket.on(enums_1.JovoDebuggerEvent.DebuggerRequest, (requestData) => {
            return this.onReceiveRequest(app, { data: requestData });
        });
        this.socket.on(enums_1.JovoDebuggerEvent.ServerRequest, (request) => {
            return this.onReceiveRequest(app, request);
        });
        this.augmentServerForApp(app);
        this.patchHandleRequestToIncludeUniqueId();
        this.patchPlatformsToCreateJovoAsProxy(app.platforms);
    }
    mount(parent) {
        var _a;
        this.augmentServerForRequest(parent);
        // Because the socket does not work properly after being cloned, the instance from the app plugin has to be used
        this.socket = (_a = parent.app.plugins.JovoDebugger) === null || _a === void 0 ? void 0 : _a.socket;
        parent.middlewareCollection.use('request.start', (jovo) => {
            return this.onRequest(jovo);
        });
    }
    emitUpdate(requestId, data) {
        var _a;
        const payload = {
            requestId,
            data,
        };
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(enums_1.JovoDebuggerEvent.AppJovoUpdate, payload);
    }
    emitStateMutation(requestId, data) {
        var _a;
        const payload = {
            requestId,
            data,
        };
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.emit(enums_1.JovoDebuggerEvent.AppStateMutation, payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    emitResponse(response, requestId) {
        if (!this.socket) {
            return this.onSocketNotConnected();
        }
        const payload = {
            requestId,
            data: response,
        };
        this.socket.emit(enums_1.JovoDebuggerEvent.AppResponse, payload);
    }
    // Augment the server given in app.handle to emit a response event when setResponse is called
    augmentServerForApp(app) {
        const handle = app.handle;
        app.handle = (server) => {
            if (!server.__augmented) {
                const setResponse = server.setResponse;
                server.originalSetResponse = setResponse;
                server.setResponse = (response) => {
                    this.emitResponse(response);
                    return setResponse.call(server, response);
                };
                server.__augmented = true;
            }
            return handle.call(app, server);
        };
    }
    // Augment the server of HandleRequest to emit a response with a debugger request id if setResponse is called.
    // If the server was already augmented by augmentServerForApp, the original method will be used instead of the already augmented one.
    augmentServerForRequest(handleRequest) {
        const serverCopy = Object.create(handleRequest.server);
        for (const prop in handleRequest.server) {
            if (handleRequest.server.hasOwnProperty(prop)) {
                serverCopy[prop] = handleRequest.server[prop];
            }
        }
        const setResponse = (serverCopy.__augmented && serverCopy.originalSetResponse) || serverCopy.setResponse;
        serverCopy.setResponse = (response) => {
            this.emitResponse(response, handleRequest.debuggerRequestId);
            return setResponse.call(serverCopy, response);
        };
        Object.defineProperty(handleRequest, 'server', {
            value: serverCopy,
        });
    }
    patchHandleRequestToIncludeUniqueId() {
        // this cannot be done in a middleware-hook because the debuggerRequestId is required when initializing the jovo instance
        // and that happens before the middlewares are executed
        const mount = framework_1.HandleRequest.prototype.mount;
        framework_1.HandleRequest.prototype.mount = function () {
            this.debuggerRequestId = (0, uuid_1.v4)();
            return mount.call(this);
        };
    }
    patchPlatformsToCreateJovoAsProxy(platforms) {
        platforms.forEach((platform) => {
            const createJovoFn = platform.createJovoInstance;
            // overwrite createJovoInstance to create a proxy and propagate all initial changes
            platform.createJovoInstance = (app, handleRequest) => {
                const jovo = createJovoFn.call(platform, app, handleRequest);
                // propagate initial values, might not be required, TBD
                for (const key in jovo) {
                    if (!jovo.hasOwnProperty(key)) {
                        continue;
                    }
                    const value = jovo[key];
                    const isEmptyObject = typeof value === 'object' && !Array.isArray(value) && !Object.keys(value || {}).length;
                    const isEmptyArray = Array.isArray(value) && !(value || []).length;
                    if (this.config.ignoredProperties.includes(key) ||
                        !value ||
                        isEmptyObject ||
                        isEmptyArray) {
                        continue;
                    }
                    this.emitUpdate(handleRequest.debuggerRequestId, {
                        key,
                        value,
                        path: key,
                    });
                }
                return new Proxy(jovo, this.createObjectProxyHandler(handleRequest));
            };
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createObjectProxyHandler(handleRequest, currentPath = '') {
        function getCompletePropertyPath(key, path) {
            return path ? [path, key].join('.') : key;
        }
        // class Foo { bar: string} -> new Proxy(new Foo(), { get() {...}})
        return {
            get: (target, key) => {
                const stringKey = key.toString();
                // make __isProxy return true for all proxies with this handler
                if (stringKey === '__isProxy') {
                    return true;
                }
                // provide a reference to the original target of the proxy
                if (stringKey === '__target') {
                    return target;
                }
                const value = target[key];
                const completePropertyPath = getCompletePropertyPath(stringKey, currentPath);
                // if the value is a function and a state mutating method
                if (typeof value === 'function' &&
                    Array.from(constants_1.STATE_MUTATING_METHOD_KEYS).includes(stringKey)) {
                    return new Proxy(target[key], this.createStateMutationProxyHandler(handleRequest, stringKey));
                }
                const isSupportedObject = value &&
                    typeof value === 'object' &&
                    !(value instanceof Date) &&
                    !(value instanceof framework_1.Jovo);
                const shouldCreateProxy = value && !value.__isProxy && !this.config.ignoredProperties.includes(stringKey);
                // if the value is a supported object and not ignored, nor a proxy already
                if (isSupportedObject && shouldCreateProxy) {
                    // create the proxy for the value
                    const proxy = new Proxy(value, this.createObjectProxyHandler(handleRequest, completePropertyPath));
                    // check if the property is writable, if it's not, return the proxy
                    const propertyDescriptor = Object.getOwnPropertyDescriptor(target, key);
                    if (!(propertyDescriptor === null || propertyDescriptor === void 0 ? void 0 : propertyDescriptor.writable)) {
                        return proxy;
                    }
                    // otherwise overwrite the property and set it to the proxy
                    target[key] = proxy;
                }
                return target[key];
            },
            set: (target, key, value) => {
                const previousValue = target[key];
                target[key] = value;
                const stringKey = key.toString();
                // only emit changes
                if (!(0, es6_1.default)(previousValue, value) && !this.config.ignoredProperties.includes(stringKey)) {
                    const stringKey = key.toString();
                    this.emitUpdate(handleRequest.debuggerRequestId, {
                        key: stringKey,
                        value,
                        previousValue,
                        path: getCompletePropertyPath(stringKey, currentPath),
                    });
                }
                return true;
            },
            deleteProperty: (target, key) => {
                const stringKey = key.toString();
                const copy = (0, lodash_clonedeep_1.default)(target);
                delete copy[key];
                this.emitUpdate(handleRequest.debuggerRequestId, {
                    key: stringKey,
                    value: copy,
                    previousValue: target,
                    path: currentPath,
                });
                return true;
            },
        };
    }
    createStateMutationProxyHandler(handleRequest, key) {
        return {
            // Parameters<Jovo[KEY]> sadly only returns the parameters of the method without generics, therefore unknown[] is used
            apply: (target, thisArg, argArray) => {
                const mutationData = this.getStateMutationData(handleRequest, key, thisArg, argArray);
                if (mutationData) {
                    this.emitStateMutation(handleRequest.debuggerRequestId, mutationData);
                }
                return target.apply(thisArg, argArray);
            },
        };
    }
    getStateMutationData(handleRequest, key, jovo, args) {
        var _a;
        let node;
        let handler = framework_1.BuiltInHandler.Start;
        if (key === '$redirect' || key === '$delegate') {
            const componentName = typeof args[0] === 'function' && 'name' in args[0] ? args[0].name : args[0];
            node = handleRequest.componentTree.getNodeRelativeTo(componentName, (_a = handleRequest.activeComponentNode) === null || _a === void 0 ? void 0 : _a.path);
            handler = typeof args[1] === 'string' ? args[1] : JSON.stringify(args[1], undefined, 2);
        }
        else if (key === '$resolve') {
            if (!jovo.$state) {
                return;
            }
            const currentStateStackItem = jovo.$state[jovo.$state.length - 1];
            const previousStateStackItem = jovo.$state[jovo.$state.length - 2];
            // make sure the state-stack exists and it long enough
            if (!(currentStateStackItem === null || currentStateStackItem === void 0 ? void 0 : currentStateStackItem.resolve) || !previousStateStackItem) {
                return;
            }
            const previousComponentPath = previousStateStackItem.component.split('.');
            node = handleRequest.componentTree.getNodeAt(previousComponentPath);
            handler = currentStateStackItem.resolve[args[0]];
        }
        if (!node) {
            return;
        }
        return {
            key,
            to: {
                path: node.path.join('.'),
                handler,
            },
        };
    }
    async onConnected() {
        var _a, _b;
        const color = (_a = util_1.inspect.colors['blue']) !== null && _a !== void 0 ? _a : [0, 0];
        const blueText = (str) => `\u001b[${color[0]}m${str}\u001b[${color[1]}m`;
        const underlineColor = (_b = util_1.inspect.colors['underline']) !== null && _b !== void 0 ? _b : [0, 0];
        const underline = (str) => `\u001b[${underlineColor[0]}m${str}\u001b[${underlineColor[1]}m`;
        const webhookId = await this.retrieveLocalWebhookId();
        const debuggerUrl = `${this.config.webhookUrl}/${webhookId}`;
        // eslint-disable-next-line no-console
        console.log('\nThis is your webhook url ☁️ ' + underline(blueText(debuggerUrl)));
    }
    async onDebuggingAvailable() {
        if (!this.socket) {
            return this.onSocketNotConnected();
        }
        await this.emitDebuggerConfig();
        await this.emitLanguageModelIfEnabled();
        if (!this.hasOverriddenWrite) {
            // disable logging events for now because they are not shown anyways
            // propagateStreamAsLog(process.stdout, this.socket);
            // propagateStreamAsLog(process.stderr, this.socket);
            this.hasOverriddenWrite = true;
        }
    }
    async onReceiveRequest(app, request) {
        await app.handle(new MockServer_1.MockServer(request));
    }
    onRequest(jovo) {
        if (!this.socket) {
            return this.onSocketNotConnected();
        }
        const payload = {
            requestId: jovo.$handleRequest.debuggerRequestId,
            data: jovo.$request,
        };
        this.socket.emit(enums_1.JovoDebuggerEvent.AppRequest, payload);
    }
    async emitLanguageModelIfEnabled() {
        if (!this.config.modelsPath) {
            return;
        }
        if (!this.socket) {
            return this.onSocketNotConnected();
        }
        try {
            const languageModel = await this.loadLanguageModel();
            if (!languageModel) {
                return;
            }
            this.socket.emit(enums_1.JovoDebuggerEvent.AppLanguageModelResponse, languageModel);
        }
        catch (e) {
            return;
        }
    }
    // Return the language models found at the configured location
    async loadLanguageModel() {
        const languageModel = {};
        const absoluteModelsPath = (0, path_1.resolve)((0, process_1.cwd)(), this.config.modelsPath);
        let files = [];
        try {
            files = await fs_1.promises.readdir(absoluteModelsPath);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.warn(new LanguageModelDirectoryNotFoundError_1.LanguageModelDirectoryNotFoundError(absoluteModelsPath));
            return;
        }
        const isValidFileRegex = /^.*([.]js(?:on)?)$/;
        for (let i = 0, len = files.length; i < len; i++) {
            const match = isValidFileRegex.exec(files[i]);
            if (!match) {
                continue;
            }
            const locale = files[i].substring(0, files[i].indexOf(match[1]));
            const absoluteFilePath = (0, path_1.join)(absoluteModelsPath, files[i]);
            if (match[1] === '.json') {
                try {
                    const fileBuffer = await fs_1.promises.readFile(absoluteFilePath);
                    languageModel[locale] = JSON.parse(fileBuffer.toString());
                }
                catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                }
            }
            else {
                languageModel[locale] = this.requireUncached(absoluteModelsPath);
            }
        }
        return languageModel;
    }
    async emitDebuggerConfig() {
        if (!this.config.debuggerConfigPath) {
            return;
        }
        if (!this.socket) {
            return this.onSocketNotConnected();
        }
        try {
            const debuggerConfig = await this.loadDebuggerConfig();
            this.socket.emit(enums_1.JovoDebuggerEvent.AppDebuggerConfigResponse, debuggerConfig);
        }
        catch (e) {
            return;
        }
    }
    // Return the debugger config at the configured location or return a default config.
    async loadDebuggerConfig() {
        try {
            const absoluteDebuggerConfigPath = (0, path_1.resolve)((0, process_1.cwd)(), this.config.debuggerConfigPath);
            return this.requireUncached(absoluteDebuggerConfigPath);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.info('Error occurred while loading debugger-config, using default config.');
            return new DebuggerConfig_1.DebuggerConfig();
        }
    }
    async connectToWebhook() {
        const webhookId = await this.retrieveLocalWebhookId();
        const socket = (0, socket_io_client_1.connect)(this.config.webhookUrl, {
            query: {
                id: webhookId,
                type: 'app',
            },
        });
        socket.on('connect', () => {
            this.hasShownConnectionError = false;
            this.onConnected();
        });
        socket.on('connect_error', (error) => {
            if (!this.hasShownConnectionError) {
                // eslint-disable-next-line no-console
                console.warn(new SocketConnectionFailedError_1.SocketConnectionFailedError(this.config.webhookUrl, error).message);
                this.hasShownConnectionError = true;
            }
        });
        return socket;
    }
    async retrieveLocalWebhookId() {
        var _a;
        const homeConfigPath = (0, path_1.resolve)((0, os_1.homedir)(), '.jovo/config');
        try {
            const homeConfigBuffer = await fs_1.promises.readFile(homeConfigPath);
            const homeConfigData = JSON.parse(homeConfigBuffer.toString());
            if ((_a = homeConfigData === null || homeConfigData === void 0 ? void 0 : homeConfigData.webhook) === null || _a === void 0 ? void 0 : _a.uuid) {
                return homeConfigData.webhook.uuid;
            }
            throw new Error();
        }
        catch (e) {
            throw new WebhookIdNotFoundError_1.WebhookIdNotFoundError(homeConfigPath);
        }
    }
    onSocketNotConnected() {
        // eslint-disable-next-line no-console
        console.warn(new SocketNotConnectedError_1.SocketNotConnectedError(this.config.webhookUrl).message);
    }
    // Require the module and clear cache if there is any
    // This is useful for being able to use changed js-files
    requireUncached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    }
}
exports.JovoDebugger = JovoDebugger;
//# sourceMappingURL=JovoDebugger.js.map