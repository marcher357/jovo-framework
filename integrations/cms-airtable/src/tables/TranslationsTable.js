"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsTable = void 0;
const framework_1 = require("@jovotech/framework");
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const AirtableTable_1 = require("./AirtableTable");
class TranslationsTable extends AirtableTable_1.AirtableTable {
    getDefaultConfig() {
        return {};
    }
    parse(values, jovo) {
        const headers = values.shift();
        const resources = {};
        const platforms = Object.values(jovo.$plugins).filter((plugin) => plugin.constructor.prototype instanceof framework_1.Platform);
        let key = '';
        for (const row of values) {
            // If the current key is empty, take the previous one
            key = row[0] && row[0] !== '' ? row[0] : key;
            for (let i = 1; i < headers.length; i++) {
                const cell = row[i];
                if (!cell) {
                    continue;
                }
                // Store an empty value if cell contains "/"
                const cellValue = cell === '/' ? '' : cell;
                const header = headers[i];
                const platform = platforms.find((platform) => header.split(':').indexOf(platform.id) > 0);
                let locale;
                if (platform) {
                    locale = header.split(':').shift();
                }
                else {
                    locale = header;
                }
                // Check if locale has a valid format
                // Credit to https://stackoverflow.com/a/48300605/10204142
                if (!locale.match(/^[A-Za-z]{2,4}([_-]([A-Za-z]{4}|[0-9]{3}))?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)) {
                    continue;
                }
                const i18nKey = `${locale}${platform ? `.${platform.id}` : ''}.translation.${key}`;
                // If a value already exists, concatenate the current value
                let existingValue = (0, lodash_get_1.default)(resources, i18nKey);
                if (!existingValue) {
                    (0, lodash_set_1.default)(resources, i18nKey, cellValue);
                }
                else {
                    if (Array.isArray(existingValue)) {
                        existingValue.push(cellValue);
                    }
                    else {
                        existingValue = [existingValue, cellValue];
                    }
                    (0, lodash_set_1.default)(resources, i18nKey, existingValue);
                }
            }
        }
        // Feed resources to i18n, if configured
        for (const locale of Object.keys(resources)) {
            for (const key of Object.keys(resources[locale])) {
                if (key === 'translation') {
                    jovo.$app.i18n.i18n.addResourceBundle(locale, 'translation', resources[locale]['translation'], true, false);
                }
                else {
                    jovo.$app.i18n.i18n.addResourceBundle(locale, `${key}.translation`, resources[locale][key]['translation'], true, false);
                }
            }
        }
        return resources;
    }
}
exports.TranslationsTable = TranslationsTable;
//# sourceMappingURL=TranslationsTable.js.map