"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewHook = void 0;
const cli_core_1 = require("@jovotech/cli-core");
const utilities_1 = require("../utilities");
class NewHook extends cli_core_1.PluginHook {
    install() {
        this.middlewareCollection = {
            new: [this.setDefaultConfig.bind(this)],
        };
    }
    async setDefaultConfig() {
        // Check for invalid locales and provide a default locale map.
        for (const locale of this.$context.locales) {
            if (!utilities_1.SupportedLocales.includes(locale)) {
                // Prompt user for alternative locale.
                cli_core_1.Log.spacer();
                const { locales } = await (0, cli_core_1.promptSupportedLocales)(locale, 'Dialogflow', utilities_1.SupportedLocales);
                if (!locales.length) {
                    continue;
                }
                if (!this.$plugin.config.locales) {
                    this.$plugin.config.locales = {};
                }
                this.$plugin.config.locales[locale] = locales;
            }
        }
    }
}
exports.NewHook = NewHook;
//# sourceMappingURL=NewHook.js.map