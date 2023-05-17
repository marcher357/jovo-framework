"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeListen = exports.mergeInstances = exports.instanceToObject = exports.isAnInstance = exports.formatList = exports.formatValidationErrors = exports.registerOutputPlatform = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_mergewith_1 = __importDefault(require("lodash.mergewith"));
const lodash_unset_1 = __importDefault(require("lodash.unset"));
const _1 = require(".");
const NormalizedOutputTemplatePlatforms_1 = require("./models/NormalizedOutputTemplatePlatforms");
function registerOutputPlatform(platformKey, platformType) {
    (0, _1.IsOptional)()(NormalizedOutputTemplatePlatforms_1.NormalizedOutputTemplatePlatforms.prototype, platformKey);
    (0, _1.ValidateNested)()(NormalizedOutputTemplatePlatforms_1.NormalizedOutputTemplatePlatforms.prototype, platformKey);
    (0, class_transformer_1.Type)(() => platformType)(NormalizedOutputTemplatePlatforms_1.NormalizedOutputTemplatePlatforms.prototype, platformKey);
}
exports.registerOutputPlatform = registerOutputPlatform;
function formatValidationErrors(errors, options) {
    const errorMessages = [];
    // go through each validation error, add message for constraints, if children add children with updated path
    function handleValidationError(error, path = '') {
        var _a;
        path += error.property;
        if (error.constraints) {
            const values = Object.values(error.constraints);
            errorMessages.push(...values.map((text) => {
                return `${path.endsWith('.') ? path.slice(0, path.length - 1) : path}: ${text}`;
            }));
        }
        if ((_a = error.children) === null || _a === void 0 ? void 0 : _a.length) {
            for (let i = 0, len = error.children.length; i < len; i++) {
                handleValidationError(error.children[i], path + '.');
            }
        }
    }
    for (let i = 0, len = errors.length; i < len; i++) {
        handleValidationError(errors[i], (options === null || options === void 0 ? void 0 : options.path) ? `${options.path}.` : undefined);
    }
    const { text, delimiter } = Object.assign({ text: '', delimiter: '\n - ' }, (options || {}));
    return `${text}${delimiter}${errorMessages.join(delimiter)}`;
}
exports.formatValidationErrors = formatValidationErrors;
function formatList(items, delimiter = ', ', lastDelimiter = ' or ') {
    if (items.length === 0) {
        return '';
    }
    if (items.length === 1) {
        return items[0].toString();
    }
    return `${items
        .slice(0, items.length - 1)
        .map((item) => item.toString())
        .join(delimiter)}${lastDelimiter}${items[items.length - 1].toString()}`;
}
exports.formatList = formatList;
function isAnInstance(instance, ignoredConstructorNames = ['Object', 'Array']) {
    var _a;
    return (typeof instance === 'object' &&
        !!((_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.name) &&
        !ignoredConstructorNames.includes(instance.constructor.name));
}
exports.isAnInstance = isAnInstance;
function instanceToObject(instance) {
    if (!isAnInstance(instance)) {
        return instance;
    }
    return Object.keys(instance).reduce((object, key) => {
        const value = instance[key];
        object[key] = isAnInstance(value) ? instanceToObject(value) : value;
        return object;
    }, {});
}
exports.instanceToObject = instanceToObject;
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
function mergeInstances(destination, ...sources) {
    return (0, lodash_mergewith_1.default)(destination, ...sources.map((source) => instanceToObject(source)), 
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    (value, srcValue, key, object) => {
        if (Array.isArray(srcValue) && Array.isArray(value)) {
            return srcValue.concat(value);
        }
        if (typeof srcValue === 'undefined') {
            (0, lodash_unset_1.default)(object, key);
        }
    });
}
exports.mergeInstances = mergeInstances;
function mergeListen(target, mergeWith) {
    // if target is an object and not null and mergeWith is true, target should not be overwritten
    if (typeof target === 'object' && target && mergeWith === true) {
        return target;
    }
    // if mergeWith is not undefined, target should become mergeWith
    if (typeof mergeWith !== 'undefined') {
        // if mergeWith is an object and not null, just return a copy of mergeWith, otherwise return mergeWith
        return typeof mergeWith === 'object' && mergeWith ? Object.assign({}, mergeWith) : mergeWith;
    }
    // if mergeWith is undefined, just return target
    return target;
}
exports.mergeListen = mergeListen;
//# sourceMappingURL=utilities.js.map