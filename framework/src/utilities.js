"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.mask = exports.getMethodKeys = exports.forEachDeep = void 0;
const common_1 = require("@jovotech/common");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_intersection_1 = __importDefault(require("lodash.intersection"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const lodash_unset_1 = __importDefault(require("lodash.unset"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forEachDeep(value, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
handler, path = '') {
    if (path) {
        handler(value, path);
    }
    if (Array.isArray(value)) {
        value.forEach((val, index) => {
            forEachDeep(val, handler, `${path}[${index}]`);
        });
    }
    else if (value && typeof value === 'object') {
        Object.keys(value).forEach((key) => {
            forEachDeep(value[key], handler, path ? `${path}.${key}` : key);
        });
    }
}
exports.forEachDeep = forEachDeep;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMethodKeys(prototype) {
    return Object.getOwnPropertyNames(prototype).filter((key) => {
        if (key === 'constructor') {
            return false;
        }
        const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
        return (typeof prototype[key] === 'function' &&
            typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) === 'function');
    });
}
exports.getMethodKeys = getMethodKeys;
/**
 * Allows to mask certain properties of an object to hide sensitive data.
 * Alters the original object.
 * @param obj - Object which contains properties to mask
 * @param objectsToMask - Array of strings representing the properties to mask. Nested properties are supported, e.g. "foo.bar".
 * @param mask - Mask value to apply. If a function is provided, it will be executed and the result will be taken as the mask value.
 */
function mask(obj, objectsToMask, mask) {
    objectsToMask.forEach((maskPath) => {
        const value = (0, lodash_get_1.default)(obj, maskPath);
        if (value) {
            const maskedValue = typeof mask === 'function' ? mask(value) : mask;
            (0, lodash_set_1.default)(obj, maskPath, maskedValue);
        }
    });
}
exports.mask = mask;
/**
 * Copies an object and allows to suggest properties to include/exclude
 * @param source - Source object to copy
 * @param config - Copy configuration, allows to set properties to include/exclude when copying. Nested properties are supported, e.g. "foo.bar".
 */
function copy(source, config) {
    var _a, _b;
    const intersection = (0, lodash_intersection_1.default)(config === null || config === void 0 ? void 0 : config.include, config === null || config === void 0 ? void 0 : config.exclude);
    if (intersection.length) {
        throw new common_1.JovoError({
            message: `Collision detected during object construction, trying to include/exclude the same properties ${JSON.stringify(intersection)}`,
            hint: 'Please disambiguate your configuration by specifying which properties to include/exclude',
        });
    }
    let result = {};
    if ((_a = config === null || config === void 0 ? void 0 : config.include) === null || _a === void 0 ? void 0 : _a.length) {
        config.include.forEach((includePath) => {
            (0, lodash_set_1.default)(result, includePath, (0, lodash_get_1.default)(source, includePath));
        });
    }
    else {
        result = JSON.parse(JSON.stringify(source));
    }
    if ((_b = config === null || config === void 0 ? void 0 : config.exclude) === null || _b === void 0 ? void 0 : _b.length) {
        config.exclude.forEach((excludePath) => {
            (0, lodash_unset_1.default)(result, excludePath);
        });
    }
    return result;
}
exports.copy = copy;
//# sourceMappingURL=utilities.js.map