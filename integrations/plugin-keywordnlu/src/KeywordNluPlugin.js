"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordNluPlugin = void 0;
const framework_1 = require("@jovotech/framework");
class KeywordNluPlugin extends framework_1.Plugin {
    getDefaultConfig() {
        return {
            keywordMap: {},
            fallbackLocale: 'en',
        };
    }
    install(app) {
        if (!(app instanceof framework_1.App)) {
            throw new framework_1.InvalidParentError(this.constructor.name, framework_1.App);
        }
    }
    mount(parent) {
        parent.middlewareCollection.use('before.interpretation.nlu', (jovo) => {
            var _a, _b;
            const text = (_a = jovo.$input.getText()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const locale = this.getLocale(jovo);
            if (text && ((_b = this.config.keywordMap[locale]) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(text))) {
                jovo.$input.intent = this.config.keywordMap[locale][text];
                // If a keyword matches, skip other NLU integrations for better performance
                jovo.$handleRequest.skipMiddlewares('interpretation.nlu');
            }
        });
    }
    getLocale(jovo) {
        const locale = jovo.$request.getLocale() || this.config.fallbackLocale;
        // Only use generic locales like 'en' instead of e.g. 'en-US'
        const genericLocale = locale.split('-')[0];
        return genericLocale;
    }
}
exports.KeywordNluPlugin = KeywordNluPlugin;
//# sourceMappingURL=KeywordNluPlugin.js.map