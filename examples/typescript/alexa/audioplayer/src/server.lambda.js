"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const server_lambda_1 = require("@jovotech/server-lambda");
const app_1 = require("./app");
/*
|--------------------------------------------------------------------------
| LAMBDA CONFIGURATION
|--------------------------------------------------------------------------
|
| Used to run the app on AWS Lambda
| Learn more here: www.jovo.tech/docs/server/lambda
|
*/
const handler = async (event, context, callback) => {
    await app_1.app.initialize();
    await app_1.app.handle(new server_lambda_1.Lambda(event, context, callback));
};
exports.handler = handler;
//# sourceMappingURL=server.lambda.js.map