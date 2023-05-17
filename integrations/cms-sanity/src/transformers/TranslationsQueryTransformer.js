"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsQueryTransformer = void 0;
const BaseSanityQueryTransformer_1 = require("./BaseSanityQueryTransformer");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_set_1 = __importDefault(require("lodash.set"));
class TranslationsQueryTransformer extends BaseSanityQueryTransformer_1.BaseSanityQueryTransformer {
    getDefaultConfig() {
        return {
            query: "*[_type == 'translation' && !(_id in path('drafts.**'))]",
        };
    }
    execute(values, jovo) {
        var _a;
        const resources = {};
        for (const item of values) {
            const isValidLocale = this.processLocale(item.key, item.defaultEntry, resources);
            if (!isValidLocale)
                continue;
            for (const additionalItem of (_a = item.additionalEntries) !== null && _a !== void 0 ? _a : []) {
                const isValidLocale = this.processLocale(item.key, additionalItem, resources);
                if (!isValidLocale)
                    continue;
            }
        }
        // Feed resources to i18n, if configured
        for (const locale of Object.keys(resources)) {
            for (const key of Object.keys(resources[locale])) {
                if (key === 'translation') {
                    jovo.$app.i18n.i18n.addResourceBundle(locale, 'translation', resources[locale]['translation']);
                }
                else {
                    jovo.$app.i18n.i18n.addResourceBundle(locale, `${key}.translation`, resources[locale][key]['translation']);
                }
            }
        }
        return resources;
    }
    processLocale(key, item, resources) {
        // Check if locale has a valid format
        // Credit to https://stackoverflow.com/a/48300605/10204142
        if (!item.locale.match(/^[A-Za-z]{2,4}([_-]([A-Za-z]{4}|[0-9]{3}))?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)) {
            return false;
        }
        const i18nKey = `${item.locale}${item.platform ? `.${item.platform}` : ''}.translation.${key}`;
        let existingValue = (0, lodash_get_1.default)(resources, i18nKey);
        if (!existingValue) {
            (0, lodash_set_1.default)(resources, i18nKey, item.text);
        }
        else {
            if (Array.isArray(existingValue)) {
                existingValue.push(item.text);
            }
            else {
                existingValue = [existingValue, item.text];
            }
            (0, lodash_set_1.default)(resources, i18nKey, existingValue);
        }
        return true;
    }
}
exports.TranslationsQueryTransformer = TranslationsQueryTransformer;
//# sourceMappingURL=TranslationsQueryTransformer.js.map