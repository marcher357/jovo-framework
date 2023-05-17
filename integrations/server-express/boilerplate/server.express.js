"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_express_1 = require("@jovotech/server-express");
const app_1 = require("./app");
/*
|--------------------------------------------------------------------------
| EXPRESS SERVER CONFIGURATION
|--------------------------------------------------------------------------
|
| Creates a new express app instance, default for local development
| Learn more here: https://www.jovo.tech/marketplace/server-express
|
*/
const port = process.env.JOVO_PORT || 3000;
(async () => {
    if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
        return;
    }
    await app_1.app.initialize();
    server_express_1.Webhook.listen(port, () => {
        console.info(`Local server listening on port ${port}.`);
    });
    server_express_1.Webhook.post('/webhook', async (req, res) => {
        await app_1.app.handle(new server_express_1.ExpressJs(req, res));
    });
})();
//# sourceMappingURL=server.express.js.map