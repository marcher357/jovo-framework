"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const framework_1 = require("@jovotech/framework");
const platform_googlebusiness_1 = require("@jovotech/platform-googlebusiness");
const nlu_nlpjs_1 = require("@jovotech/nlu-nlpjs");
const lang_en_1 = require("@nlpjs/lang-en");
const service_account_json_1 = __importDefault(require("./service-account.json"));
const GlobalComponent_1 = require("./components/GlobalComponent");
const LoveHatePizzaComponent_1 = require("./components/LoveHatePizzaComponent");
/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new framework_1.App({
    /*
    |--------------------------------------------------------------------------
    | Components
    |--------------------------------------------------------------------------
    |
    | Components contain the Jovo app logic
    | Learn more here: www.jovo.tech/docs/components
    |
    */
    components: [GlobalComponent_1.GlobalComponent, LoveHatePizzaComponent_1.LoveHatePizzaComponent],
    /*
    |--------------------------------------------------------------------------
    | Plugins
    |--------------------------------------------------------------------------
    |
    | Includes platforms, database integrations, third-party plugins, and more
    | Learn more here: www.jovo.tech/docs/plugins, www.jovo.tech/marketplace
    |
    */
    plugins: [
        new platform_googlebusiness_1.GoogleBusinessPlatform({
            serviceAccount: service_account_json_1.default,
            plugins: [
                new nlu_nlpjs_1.NlpjsNlu({
                    // www.jovo.tech/marketplace/nlu-nlpjs
                    languageMap: {
                        en: lang_en_1.LangEn,
                    },
                }),
            ],
        }),
    ],
    /*
    |--------------------------------------------------------------------------
    | Other options
    |--------------------------------------------------------------------------
    |
    | Includes all other configuration options like logging
    | Learn more here: www.jovo.tech/docs/app-config
    |
    */
    logging: true,
});
exports.app = app;
//# sourceMappingURL=app.js.map