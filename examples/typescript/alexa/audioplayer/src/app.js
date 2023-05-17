"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const framework_1 = require("@jovotech/framework");
const platform_alexa_1 = require("@jovotech/platform-alexa");
const GlobalComponent_1 = require("./components/GlobalComponent");
const AudioPlayerComponent_1 = require("./components/AudioPlayerComponent");
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
    components: [GlobalComponent_1.GlobalComponent, AudioPlayerComponent_1.AudioPlayerComponent],
    /*
    |--------------------------------------------------------------------------
    | Plugins
    |--------------------------------------------------------------------------
    |
    | Includes platforms, database integrations, third-party plugins, and more
    | Learn more here: www.jovo.tech/docs/plugins, www.jovo.tech/marketplace
    |
    */
    plugins: [new platform_alexa_1.AlexaPlatform()],
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