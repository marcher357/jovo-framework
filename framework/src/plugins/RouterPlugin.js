"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterPlugin = void 0;
const common_1 = require("@jovotech/common");
const DuplicateGlobalIntentsError_1 = require("../errors/DuplicateGlobalIntentsError");
const MetadataStorage_1 = require("../metadata/MetadataStorage");
const Plugin_1 = require("../Plugin");
const RoutingExecutor_1 = require("./RoutingExecutor");
class RouterPlugin extends Plugin_1.Plugin {
    getDefaultConfig() {
        return {};
    }
    initialize(parent) {
        return this.checkForDuplicateGlobalHandlers(parent);
    }
    mount(parent) {
        parent.middlewareCollection.use('dialogue.router', (jovo) => {
            return this.setRoute(jovo);
        });
    }
    async setRoute(jovo) {
        var _a;
        if (jovo.$input.type === common_1.InputType.Error) {
            return jovo.$app.handleError(new Error(jovo.$input.getText() || 'Input is of type ERROR'), jovo);
        }
        // merge global intent map with intent map of currently used platform
        const mergedIntentMap = Object.assign(Object.assign({}, (((_a = jovo.$config.routing) === null || _a === void 0 ? void 0 : _a.intentMap) || {})), (jovo.$platform.config.intentMap || {}));
        const mappedIntent = this.getMappedIntent(jovo.$input, mergedIntentMap);
        if (mappedIntent) {
            jovo.$input.intent = mappedIntent;
        }
        jovo.$route = await new RoutingExecutor_1.RoutingExecutor(jovo).execute();
    }
    getMappedIntent(input, intentMap) {
        var _a;
        const intent = input.intent || ((_a = input.nlu) === null || _a === void 0 ? void 0 : _a.intent);
        if (!intent)
            return;
        const intentName = typeof intent === 'string' ? intent : intent.name;
        const mappedIntentName = intentMap === null || intentMap === void 0 ? void 0 : intentMap[intentName];
        if (!mappedIntentName)
            return;
        return input.intent && typeof input.intent === 'object'
            ? Object.assign(Object.assign({}, input.intent), { name: mappedIntentName }) : mappedIntentName;
    }
    checkForDuplicateGlobalHandlers(app) {
        return new Promise((resolve, reject) => {
            var _a;
            const globalHandlerMap = {};
            // make an intent map out of all the intent maps of all platforms
            const platformIntentMap = app.platforms.reduce((intentMap, platform) => {
                return Object.assign(Object.assign({}, intentMap), (platform.config.intentMap || {}));
            }, {});
            // merge the global intent map with the intent map created by all platforms
            const mergedIntentMap = Object.assign(Object.assign({}, (((_a = app.config.routing) === null || _a === void 0 ? void 0 : _a.intentMap) || {})), platformIntentMap);
            app.componentTree.forEach((node) => {
                const componentHandlerMetadata = MetadataStorage_1.MetadataStorage.getInstance().getMergedHandlerMetadataOfComponent(node.metadata.target);
                componentHandlerMetadata.forEach((handlerMetadata) => {
                    handlerMetadata.globalIntentNames.forEach((globalIntentName) => {
                        const mappedIntentName = (mergedIntentMap === null || mergedIntentMap === void 0 ? void 0 : mergedIntentMap[globalIntentName]) || globalIntentName;
                        if (!globalHandlerMap[mappedIntentName]) {
                            globalHandlerMap[mappedIntentName] = [];
                        }
                        if (!handlerMetadata.hasCondition) {
                            globalHandlerMap[mappedIntentName].push(handlerMetadata);
                        }
                    });
                });
            });
            const duplicateHandlerEntries = Object.entries(globalHandlerMap).filter(([, handlers]) => handlers.length > 1);
            if (duplicateHandlerEntries.length) {
                return reject(new DuplicateGlobalIntentsError_1.DuplicateGlobalIntentsError(duplicateHandlerEntries));
            }
            return resolve();
        });
    }
}
exports.RouterPlugin = RouterPlugin;
//# sourceMappingURL=RouterPlugin.js.map