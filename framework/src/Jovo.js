"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jovo = exports.registerPlatformSpecificJovoReference = void 0;
const output_1 = require("@jovotech/output");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const util_1 = __importDefault(require("util"));
const index_1 = require("./index");
const JovoHistory_1 = require("./JovoHistory");
const JovoSession_1 = require("./JovoSession");
const utilities_1 = require("./utilities");
const DELEGATE_MIDDLEWARE = 'event.$delegate';
const RESOLVE_MIDDLEWARE = 'event.$resolve';
const REDIRECT_MIDDLEWARE = 'event.$redirect';
const SEND_MIDDLEWARE = 'event.$send';
function registerPlatformSpecificJovoReference(key, jovoClass) {
    Object.defineProperty(Jovo.prototype, key, {
        get() {
            return this instanceof jovoClass ? this : undefined;
        },
    });
}
exports.registerPlatformSpecificJovoReference = registerPlatformSpecificJovoReference;
class Jovo {
    constructor($app, $handleRequest, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $platform) {
        this.$app = $app;
        this.$handleRequest = $handleRequest;
        this.$platform = $platform;
        this.$request = this.$platform.createRequestInstance($handleRequest.server.getRequestObject());
        this.$input = this.$request.getInput();
        this.$output = [];
        this.$data = {};
        this.$device = this.$platform.createDeviceInstance(this);
        this.$entities = this.getEntityMap();
        this.$history = new JovoHistory_1.JovoHistory($platform);
        this.$session = this.getSession();
        this.$user = this.$platform.createUserInstance(this);
        this.$cms = $app.cms;
    }
    get $config() {
        return this.$handleRequest.config;
    }
    get $server() {
        return this.$handleRequest.server;
    }
    get $plugins() {
        return this.$handleRequest.plugins;
    }
    get $state() {
        return this.$session.state;
    }
    get $subState() {
        var _a, _b;
        if (!((_a = this.$state) === null || _a === void 0 ? void 0 : _a.length))
            return;
        return (_b = this.$state[this.$state.length - 1]) === null || _b === void 0 ? void 0 : _b.subState;
    }
    set $subState(value) {
        var _a;
        if (!((_a = this.$state) === null || _a === void 0 ? void 0 : _a.length))
            return;
        this.$state[this.$state.length - 1].subState = value;
    }
    get $component() {
        var _a;
        // global components should not have component-data
        if (!((_a = this.$state) === null || _a === void 0 ? void 0 : _a.length)) {
            return {
                data: {},
            };
        }
        const latestStateStackItem = this.$state[this.$state.length - 1];
        return {
            get data() {
                if (!latestStateStackItem.data) {
                    latestStateStackItem.data = {};
                }
                return latestStateStackItem.data;
            },
            set data(value) {
                if (!latestStateStackItem.data) {
                    latestStateStackItem.data = {};
                }
                latestStateStackItem.data = value;
            },
            get config() {
                const deserializedStateConfig = (0, lodash_clonedeep_1.default)(latestStateStackItem.config);
                if (deserializedStateConfig) {
                    // deserialize all found Output-constructors
                    (0, utilities_1.forEachDeep)(deserializedStateConfig, (value, path) => {
                        // TODO: check restriction
                        if (value &&
                            typeof value === 'object' &&
                            value.type === 'output' &&
                            value.name &&
                            Object.keys(value).length === 2) {
                            const outputMetadata = index_1.MetadataStorage.getInstance().getOutputMetadataByName(value.name);
                            if (!outputMetadata) {
                                // TODO determine what to do!
                                return;
                            }
                            (0, lodash_set_1.default)(deserializedStateConfig, path, outputMetadata.target);
                        }
                    });
                }
                return deserializedStateConfig;
            },
            set config(value) {
                latestStateStackItem.config = value;
            },
        };
    }
    $t(path, options) {
        if (!options) {
            options = {};
        }
        if (!options.lng) {
            options.lng = this.$request.getLocale();
        }
        if (!options.platform) {
            options.platform = this.$platform.id;
        }
        return this.$app.i18n.t(path, options);
    }
    async $send(outputConstructorOrTemplateOrMessage, options) {
        let newOutput;
        if (typeof outputConstructorOrTemplateOrMessage === 'function') {
            const outputInstance = new outputConstructorOrTemplateOrMessage(this, options);
            const outputRes = outputInstance.build();
            const output = util_1.default.types.isPromise(outputRes) ? await outputRes : outputRes;
            // overwrite reserved properties of the built object i.e. message
            output_1.NormalizedOutputTemplate.getKeys().forEach((key) => {
                if (typeof (options === null || options === void 0 ? void 0 : options[key]) !== 'undefined') {
                    if (Array.isArray(output)) {
                        output[output.length - 1][key] =
                            key === 'platforms'
                                ? (0, lodash_merge_1.default)({}, output[output.length - 1].platforms || {}, options[key])
                                : options[key];
                    }
                    else {
                        output[key] =
                            key === 'platforms' ? (0, lodash_merge_1.default)({}, output[key] || {}, options[key]) : options[key];
                    }
                }
            });
            newOutput = output;
        }
        else if (typeof outputConstructorOrTemplateOrMessage === 'string') {
            newOutput = {
                message: outputConstructorOrTemplateOrMessage,
            };
        }
        else {
            newOutput = outputConstructorOrTemplateOrMessage;
        }
        // push the new OutputTemplate(s) to $output
        Array.isArray(newOutput) ? this.$output.push(...newOutput) : this.$output.push(newOutput);
        await this.$handleRequest.middlewareCollection.run(SEND_MIDDLEWARE, this, {
            outputConstructorOrTemplateOrMessage,
            options,
        });
    }
    async $redirect(constructorOrName, handler) {
        var _a;
        const componentName = typeof constructorOrName === 'function' ? constructorOrName.name : constructorOrName;
        // get the node with the given name relative to the currently active component-node
        const componentNode = this.$handleRequest.componentTree.getNodeRelativeToOrFail(componentName, (_a = this.$handleRequest.activeComponentNode) === null || _a === void 0 ? void 0 : _a.path);
        // clear the state stack
        this.$session.state = [];
        // add new component to the stack if it's not global
        // @see https://www.jovo.tech/docs/components#global-components
        if (!componentNode.metadata.isGlobal) {
            const stackItem = {
                component: componentNode.path.join('.'),
            };
            this.$session.state.push(stackItem);
        }
        // update the active component node in handleRequest to keep track of the state
        this.$handleRequest.activeComponentNode = componentNode;
        await this.$handleRequest.middlewareCollection.run(REDIRECT_MIDDLEWARE, this, {
            componentName,
            handler,
        });
        // execute the component's handler
        await componentNode.executeHandler({
            jovo: this.getJovoReference(),
            handler,
        });
    }
    async $delegate(constructorOrName, options) {
        var _a, _b, _c;
        const componentName = typeof constructorOrName === 'function' ? constructorOrName.name : constructorOrName;
        // get the node with the given name relative to the currently active component-node
        const componentNode = this.$handleRequest.componentTree.getNodeRelativeToOrFail(componentName, (_a = this.$handleRequest.activeComponentNode) === null || _a === void 0 ? void 0 : _a.path);
        // if the component that is currently being executed is global
        if ((_c = (_b = this.$handleRequest.activeComponentNode) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.isGlobal) {
            // make sure there is a stack
            if (!this.$session.state) {
                this.$session.state = [];
            }
            // add the current component
            this.$session.state.push({
                component: this.$handleRequest.activeComponentNode.path.join('.'),
            });
        }
        // serialize all values in 'resolve'
        const serializableResolve = {};
        for (const key in options.resolve) {
            if (options.resolve.hasOwnProperty(key)) {
                const value = options.resolve[key];
                serializableResolve[key] = typeof value === 'string' ? value : value.name;
            }
        }
        // serialize the whole config
        const serializableConfig = (0, lodash_clonedeep_1.default)(options.config);
        if (serializableConfig) {
            (0, utilities_1.forEachDeep)(serializableConfig, (value, path) => {
                // serialize all passed Output-constructors
                if ((value === null || value === void 0 ? void 0 : value.prototype) instanceof index_1.BaseOutput) {
                    const outputMetadata = index_1.MetadataStorage.getInstance().getOutputMetadata(value);
                    if (!outputMetadata) {
                        // TODO determine what to do!
                        return;
                    }
                    (0, lodash_set_1.default)(serializableConfig, path, { type: 'output', name: outputMetadata.name });
                }
            });
        }
        // push the delegating component to the state-stack
        if (!this.$session.state) {
            this.$session.state = [];
        }
        this.$session.state.push({
            resolve: serializableResolve,
            config: serializableConfig,
            component: componentNode.path.join('.'),
        });
        // update the active component node in handleRequest to keep track of the state
        this.$handleRequest.activeComponentNode = componentNode;
        await this.$handleRequest.middlewareCollection.run(DELEGATE_MIDDLEWARE, this, {
            componentName,
            options,
        });
        // execute the component's handler
        await componentNode.executeHandler({
            jovo: this.getJovoReference(),
        });
    }
    // TODO determine whether an error should be thrown if $resolve is called from a context outside a delegation
    async $resolve(eventName, ...eventArgs) {
        if (!this.$state) {
            return;
        }
        const currentStateStackItem = this.$state[this.$state.length - 1];
        const previousStateStackItem = this.$state[this.$state.length - 2];
        // make sure the state-stack exists and it long enough
        if (!(currentStateStackItem === null || currentStateStackItem === void 0 ? void 0 : currentStateStackItem.resolve) || !previousStateStackItem) {
            return;
        }
        const resolvedHandler = currentStateStackItem.resolve[eventName];
        const previousComponentPath = previousStateStackItem.component.split('.');
        // get the previous node
        const previousComponentNode = this.$handleRequest.componentTree.getNodeAtOrFail(previousComponentPath);
        // if previous component is global, remove another item from the stack to remove the global component
        if (previousComponentNode.metadata.isGlobal) {
            this.$state.pop();
        }
        // remove the latest item from the state-stack
        this.$state.pop();
        // update the active component node in handleRequest to keep track of the state
        this.$handleRequest.activeComponentNode = previousComponentNode;
        await this.$handleRequest.middlewareCollection.run(RESOLVE_MIDDLEWARE, this, {
            resolvedHandler,
            eventName,
            eventArgs,
        });
        // execute the component's handler
        await previousComponentNode.executeHandler({
            jovo: this.getJovoReference(),
            handler: resolvedHandler,
            callArgs: eventArgs,
        });
    }
    getSession() {
        const session = this.$request.getSession();
        return session instanceof JovoSession_1.JovoSession ? session : new JovoSession_1.JovoSession(session);
    }
    getEntityMap() {
        var _a;
        return this.$input.entities || ((_a = this.$input.nlu) === null || _a === void 0 ? void 0 : _a.entities) || {};
    }
    getPersistableData() {
        return {
            user: this.$user.getPersistableData(),
            session: this.$session.getPersistableData(),
            history: this.$history.getPersistableData(),
            createdAt: new Date(this.$user.createdAt).toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
    setPersistableData(data, config) {
        const isStoredElementEnabled = (key) => {
            const value = config === null || config === void 0 ? void 0 : config[key];
            return typeof value === 'object' ? value.enabled !== false : !!value;
        };
        if (isStoredElementEnabled('user')) {
            this.$user.setPersistableData(data.user);
        }
        if (isStoredElementEnabled('session')) {
            this.$session.setPersistableData(data.session, config === null || config === void 0 ? void 0 : config.session);
        }
        if (isStoredElementEnabled('history')) {
            this.$history.setPersistableData(data.history);
        }
        this.$user.createdAt = new Date((data === null || data === void 0 ? void 0 : data.createdAt) || new Date());
        this.$user.updatedAt = new Date((data === null || data === void 0 ? void 0 : data.updatedAt) || new Date());
    }
    getCurrentHistoryItem() {
        return {
            request: this.$request,
            input: this.$input,
            state: this.$state,
            entities: this.$entities,
            output: this.$output,
            response: this.$response,
        };
    }
    getJovoReference() {
        return (this === null || this === void 0 ? void 0 : this.jovo) || this;
    }
}
exports.Jovo = Jovo;
//# sourceMappingURL=Jovo.js.map