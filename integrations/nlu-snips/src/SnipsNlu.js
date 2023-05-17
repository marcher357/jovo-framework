"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnipsNlu = void 0;
const framework_1 = require("@jovotech/framework");
const path_1 = require("path");
const uuid_1 = require("uuid");
class SnipsNlu extends framework_1.NluPlugin {
    mount(parent) {
        super.mount(parent);
        parent.middlewareCollection.use('response.output', (jovo) => {
            return this.trainDynamicEntities(jovo);
        });
    }
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { serverUrl: 'http://localhost:5000/', fallbackLanguage: 'en', serverPath: '/engine/parse', engineId: (0, uuid_1.v4)(), dynamicEntities: {
                enabled: false,
                passModels: true,
                modelsDirectory: 'models',
                serverPath: '/engine/train/dynamic-entities',
            } });
    }
    async processText(jovo, text) {
        if (!jovo.$session.id) {
            throw new framework_1.JovoError({
                message: `Can not send request to Snips-NLU. Session-ID is missing.`,
            });
        }
        const config = {
            url: this.config.serverPath,
            params: {
                locale: this.getLocale(jovo.$request).substring(0, 2),
                engine_id: this.config.engineId,
                session_id: jovo.$session.id,
            },
            data: {
                text,
                intents: jovo.$session.data._JOVO_LISTEN_INTENTS_, // Used for intent scoping, @see https://snips-nlu.readthedocs.io/en/latest/api.html#snips_nlu.nlu_engine.nlu_engine.SnipsNLUEngine.parse
            },
        };
        const snipsNluResponse = await this.sendRequestToSnips(config);
        const nluData = {};
        if (snipsNluResponse.intent.intentName) {
            nluData.intent = { name: snipsNluResponse.intent.intentName };
        }
        for (const slot of snipsNluResponse.slots) {
            if (!nluData.entities) {
                nluData.entities = {};
            }
            nluData.entities[slot.slotName] = {
                id: slot.value.value,
                resolved: slot.value.value,
                value: slot.rawValue,
                native: slot,
            };
        }
        nluData.native = snipsNluResponse;
        return nluData;
    }
    /**
     * Used to to signal the parent to store intents in the session data
     * @see https://www.jovo.tech/docs/nlu#intent-scoping
     */
    supportsIntentScoping() {
        return true;
    }
    /**
     * Asynchronously trains dynamic entities. Sends the relevant portion of the Jovo langauge model to
     * the Snips NLU server.
     * @param jovo - Current Jovo object
     */
    async trainDynamicEntities(jovo) {
        var _a, _b, _c, _d, _e;
        if (!((_a = this.config.dynamicEntities) === null || _a === void 0 ? void 0 : _a.enabled)) {
            return;
        }
        const locale = this.getLocale(jovo.$request);
        for (const output of jovo.$output) {
            const listen = (_d = (_c = (_b = output.platforms) === null || _b === void 0 ? void 0 : _b[jovo.$platform.name]) === null || _c === void 0 ? void 0 : _c.listen) !== null && _d !== void 0 ? _d : output.listen;
            if (typeof listen !== 'object' ||
                !listen.entities ||
                listen.entities.mode === framework_1.DynamicEntitiesMode.Clear) {
                continue;
            }
            for (const [entityKey, entityData] of Object.entries(listen.entities.types || {})) {
                const buildRequestData = () => {
                    var _a, _b, _c, _d;
                    let model;
                    try {
                        model =
                            ((_b = (_a = this.config.dynamicEntities) === null || _a === void 0 ? void 0 : _a.models) === null || _b === void 0 ? void 0 : _b[locale]) ||
                                (((_c = this.config.dynamicEntities) === null || _c === void 0 ? void 0 : _c.modelsDirectory)
                                    ? require((0, path_1.resolve)((0, path_1.join)(this.config.dynamicEntities.modelsDirectory, locale)))
                                    : null);
                    }
                    catch (error) {
                        throw new framework_1.JovoError({ message: error.message });
                    }
                    if (!model) {
                        throw new framework_1.JovoError({
                            message: `Please provide a language model for locale ${locale}.`,
                        });
                    }
                    const originalInputType = (_d = model.entityTypes) === null || _d === void 0 ? void 0 : _d[entityKey];
                    if (!originalInputType) {
                        return;
                    }
                    if (!originalInputType.values) {
                        originalInputType.values = [];
                    }
                    // Merge values from original input type with dynamic ones
                    originalInputType.values.push(...(entityData.values || []));
                    const requestData = {
                        version: '4.0',
                        invocation: '',
                        intents: {},
                        entityTypes: {
                            [entityKey]: originalInputType,
                        },
                    };
                    // Find all intents the entity type is used in and provide them in the request to the Snips NLU server
                    for (const [intentKey, intentData] of Object.entries(model.intents || {})) {
                        if (!intentData.entities) {
                            continue;
                        }
                        for (const [entityKey, entityData] of Object.entries(intentData.entities || {})) {
                            if (!entityData.type) {
                                continue;
                            }
                            const isEqualEntityType = (entityType) => {
                                if (typeof entityType === 'object') {
                                    return entityType.snips === entityKey;
                                }
                                else {
                                    return entityType === entityKey;
                                }
                            };
                            if (isEqualEntityType(entityData.type)) {
                                requestData.intents[intentKey] = intentData;
                            }
                        }
                    }
                    return requestData;
                };
                let requestData = {};
                if ((_e = this.config.dynamicEntities) === null || _e === void 0 ? void 0 : _e.passModels) {
                    requestData = buildRequestData();
                    if (!requestData) {
                        return;
                    }
                }
                const config = {
                    url: this.config.dynamicEntities.serverPath,
                    params: {
                        locale: locale.substring(0, 2),
                        entity: entityKey,
                        engine_id: this.config.engineId,
                        session_id: jovo.$session.id,
                    },
                    data: requestData,
                };
                // run in background
                this.sendRequestToSnips(config)
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    .then(() => { })
                    .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.error(e);
                });
            }
        }
    }
    getLocale(request) {
        return request.getLocale() || this.config.fallbackLanguage;
    }
    /**
     * Sends a request to a configured Snips NLU Server
     * @param requestConfig - Request configuration
     */
    async sendRequestToSnips(requestConfig) {
        var _a, _b, _c, _d;
        const config = Object.assign({ method: 'POST', baseURL: this.config.serverUrl }, requestConfig);
        try {
            const response = await framework_1.axios.request(config);
            return response.data;
        }
        catch (error) {
            if (error.isAxiosError) {
                const errorDescription = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.description;
                throw new framework_1.JovoError({
                    message: `Request to SnipsNlu failed${errorDescription ? `: ${errorDescription}` : '.'}  `,
                    name: (_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.name,
                });
            }
            throw new framework_1.JovoError({ message: error.message });
        }
    }
}
exports.SnipsNlu = SnipsNlu;
//# sourceMappingURL=SnipsNlu.js.map