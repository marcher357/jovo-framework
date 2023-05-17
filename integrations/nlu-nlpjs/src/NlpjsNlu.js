"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpjsNlu = void 0;
const framework_1 = require("@jovotech/framework");
const model_nlpjs_1 = require("@jovotech/model-nlpjs");
const fs_1 = require("fs");
const path_1 = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Nlp } = require('@nlpjs/nlp');
class NlpjsNlu extends framework_1.NluPlugin {
    constructor(config) {
        super(config);
    }
    // TODO fully determine default config
    getDefaultConfig() {
        return Object.assign(Object.assign({}, super.getDefaultConfig()), { languageMap: {}, preTrainedModelFilePath: './model.nlp', useModel: false, modelsPath: './models' });
    }
    async initialize(parent) {
        var _a, _b;
        this.nlpjs = new Nlp({
            languages: Object.keys(this.config.languageMap),
            autoLoad: this.config.useModel,
            // TODO: add condition to check if writing is even possible
            autoSave: this.config.useModel,
            modelFileName: this.config.preTrainedModelFilePath,
            nlu: {
                log: false,
            },
        });
        Object.values(this.config.languageMap).forEach((languagePackage) => {
            var _a;
            (_a = this.nlpjs) === null || _a === void 0 ? void 0 : _a.use(languagePackage);
        });
        // TODO: register fs if write-access is available
        if (this.config.setupModelCallback) {
            await this.config.setupModelCallback(parent, this.nlpjs);
        }
        else if (this.config.useModel) {
            await ((_a = this.nlpjs) === null || _a === void 0 ? void 0 : _a.load(this.config.preTrainedModelFilePath));
        }
        else {
            await this.addCorpusFromModelsIn(this.config.modelsPath);
            await ((_b = this.nlpjs) === null || _b === void 0 ? void 0 : _b.train());
        }
    }
    async processText(jovo, text) {
        var _a, _b;
        const language = ((_a = jovo.$request.getLocale()) === null || _a === void 0 ? void 0 : _a.substr(0, 2)) || 'en';
        const nlpResult = await ((_b = this.nlpjs) === null || _b === void 0 ? void 0 : _b.process(language, text));
        const entities = ((nlpResult === null || nlpResult === void 0 ? void 0 : nlpResult.entities) || []).reduce((entityMap, entity) => {
            const entityName = entity.alias || entity.entity;
            entityMap[entityName] = {
                id: entity.option,
                resolved: entity.option,
                value: entity.utteranceText,
                native: entity,
            };
            return entityMap;
        }, {});
        return (nlpResult === null || nlpResult === void 0 ? void 0 : nlpResult.intent)
            ? {
                intent: {
                    name: nlpResult.intent,
                },
                entities,
                native: nlpResult,
                raw: nlpResult, // @deprecated please use 'native' property
            }
            : undefined;
    }
    async addCorpusFromModelsIn(dir) {
        const files = await fs_1.promises.readdir(dir);
        const jovoNlpjsConverter = new model_nlpjs_1.JovoModelNlpjs();
        for (let i = 0, len = files.length; i < len; i++) {
            const lastDotIndex = files[i].lastIndexOf('.');
            const extension = files[i].substr(lastDotIndex + 1);
            const locale = files[i].substr(0, lastDotIndex);
            const filePath = (0, path_1.join)(dir, files[i]);
            let jovoModelData;
            if (extension === 'js') {
                jovoModelData = require(filePath);
            }
            else if (extension === 'json') {
                const fileBuffer = await fs_1.promises.readFile(filePath);
                jovoModelData = JSON.parse(fileBuffer.toString());
            }
            jovoNlpjsConverter.importJovoModel(jovoModelData, locale);
            const nlpJsModeFiles = jovoNlpjsConverter.exportNative() || [];
            nlpJsModeFiles.forEach((model) => {
                var _a;
                (_a = this.nlpjs) === null || _a === void 0 ? void 0 : _a.addCorpus(model.content);
            });
        }
    }
}
exports.NlpjsNlu = NlpjsNlu;
//# sourceMappingURL=NlpjsNlu.js.map