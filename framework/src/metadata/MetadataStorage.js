"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataStorage = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const ComponentMetadata_1 = require("./ComponentMetadata");
const HandlerMetadata_1 = require("./HandlerMetadata");
const OutputMetadata_1 = require("./OutputMetadata");
class MetadataStorage {
    constructor() {
        this.componentMetadata = [];
        this.componentOptionMetadata = [];
        this.handlerMetadata = [];
        this.handlerOptionMetadata = [];
        this.outputMetadata = [];
    }
    static getInstance() {
        if (!MetadataStorage.instance) {
            MetadataStorage.instance = new MetadataStorage();
        }
        return MetadataStorage.instance;
    }
    addComponentMetadata(metadata) {
        // TODO: determine what to do if a component like that already exists
        // for now, just skip (first only counts)
        if (this.getComponentMetadata(metadata.target)) {
            return;
        }
        this.componentMetadata.push(metadata);
    }
    getComponentMetadata(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        return this.componentMetadata.find((metadata) => metadata.target === target);
    }
    getMergedComponentMetadata(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        const componentMetadata = this.getComponentMetadata(target);
        const componentOptionMetadata = this.getComponentOptionMetadata(target);
        if (!componentMetadata && !componentOptionMetadata.length) {
            return;
        }
        const mergedComponentMetadata = componentMetadata
            ? (0, lodash_clonedeep_1.default)(componentMetadata)
            : new ComponentMetadata_1.ComponentMetadata(target);
        componentOptionMetadata.forEach((optionMetadata) => mergedComponentMetadata.mergeWith(optionMetadata));
        return mergedComponentMetadata;
    }
    addComponentOptionMetadata(metadata) {
        this.componentOptionMetadata.push(metadata);
    }
    getComponentOptionMetadata(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        return this.componentOptionMetadata.filter((metadata) => metadata.target === target);
    }
    addOutputMetadata(target, name) {
        const existingMetadata = this.getOutputMetadataByName(name);
        if (existingMetadata) {
            // make sure the name of an Output is unique
            const similarExistingMetadata = this.outputMetadata.filter((metadata) => metadata.name.startsWith(name));
            const getEndingNumberRegex = /(\d+)$/;
            let highestNumber = -1;
            similarExistingMetadata.forEach((metadata) => {
                const endingNumberMatch = getEndingNumberRegex.exec(metadata.name);
                const endingNumber = +((endingNumberMatch === null || endingNumberMatch === void 0 ? void 0 : endingNumberMatch[1]) || -1);
                if (endingNumber > highestNumber) {
                    highestNumber = endingNumber;
                }
            });
            highestNumber++;
            if (getEndingNumberRegex.test(name)) {
                name = name.replace(getEndingNumberRegex, highestNumber.toString());
            }
            else {
                name += highestNumber;
            }
        }
        this.outputMetadata.push(new OutputMetadata_1.OutputMetadata(target, name));
    }
    getOutputMetadata(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        return this.outputMetadata.find((metadata) => metadata.target === target);
    }
    getOutputMetadataByName(name) {
        return this.outputMetadata.find((metadata) => metadata.name === name);
    }
    addHandlerMetadata(metadata) {
        this.handlerMetadata.push(metadata);
    }
    getHandlerMetadataOfComponent(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        return this.handlerMetadata.filter((metadata) => metadata.target === target);
    }
    getMergedHandlerMetadataOfComponent(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        const mergedComponentMetadata = this.getMergedComponentMetadata(target);
        const componentHandlerMetadata = this.getHandlerMetadataOfComponent(target);
        const mergedMetadata = componentHandlerMetadata.map((handlerMetadata) => {
            const mergedHandlerMetadata = (0, lodash_clonedeep_1.default)(handlerMetadata);
            const relatedHandlerOptionMetadata = this.handlerOptionMetadata.filter((optionMetadata) => optionMetadata.hasSameTargetAs(mergedHandlerMetadata));
            relatedHandlerOptionMetadata.forEach((optionMetadata) => mergedHandlerMetadata.mergeWith(optionMetadata));
            if (mergedComponentMetadata === null || mergedComponentMetadata === void 0 ? void 0 : mergedComponentMetadata.isGlobal) {
                mergedHandlerMetadata.options.global = true;
            }
            return mergedHandlerMetadata;
        });
        const handlerOptionMetadataWithoutHandler = this.handlerOptionMetadata.filter((optionMetadata) => optionMetadata.target === target &&
            !componentHandlerMetadata.some((handlerMetadata) => handlerMetadata.hasSameTargetAs(optionMetadata)));
        handlerOptionMetadataWithoutHandler.forEach((optionMetadata) => {
            const relatedHandlerMetadata = mergedMetadata.find((handlerMetadata) => handlerMetadata.hasSameTargetAs(optionMetadata));
            if (!relatedHandlerMetadata) {
                mergedMetadata.push(new HandlerMetadata_1.HandlerMetadata(optionMetadata.target, optionMetadata.propertyKey, Object.assign(Object.assign({}, optionMetadata.options), { global: (mergedComponentMetadata === null || mergedComponentMetadata === void 0 ? void 0 : mergedComponentMetadata.isGlobal) || optionMetadata.options.global })));
            }
            else {
                relatedHandlerMetadata.mergeWith(optionMetadata);
            }
        });
        return mergedMetadata;
    }
    addHandlerOptionMetadata(metadata) {
        this.handlerOptionMetadata.push(metadata);
    }
    getHandlerOptionMetadataOfComponent(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target) {
        return this.handlerOptionMetadata.filter((metadata) => metadata.target === target);
    }
    clearAll() {
        this.componentMetadata.length = 0;
        this.handlerMetadata.length = 0;
        this.handlerOptionMetadata.length = 0;
        this.outputMetadata.length = 0;
    }
}
exports.MetadataStorage = MetadataStorage;
//# sourceMappingURL=MetadataStorage.js.map