"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessengerRequestBuilder = void 0;
const framework_1 = require("@jovotech/framework");
const path_1 = require("path");
const _1 = require(".");
class FacebookMessengerRequestBuilder extends framework_1.RequestBuilder {
    launch(json) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const launchJson = require((0, path_1.join)(__dirname, '..', '..', 'sample-requests', 'LaunchRequest.json'));
        const request = Object.create(_1.FacebookMessengerRequest.prototype);
        return Object.assign(request, json || launchJson);
    }
    intent(nameOrJson) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const intentJson = require((0, path_1.join)(__dirname, '..', '..', 'sample-requests', 'IntentRequest.json'));
        const request = Object.create(_1.FacebookMessengerRequest.prototype);
        if (typeof nameOrJson === 'string') {
            Object.assign(request, intentJson);
            request.setIntent(nameOrJson);
        }
        else {
            Object.assign(request, nameOrJson || intentJson);
        }
        return request;
    }
}
exports.FacebookMessengerRequestBuilder = FacebookMessengerRequestBuilder;
//# sourceMappingURL=FacebookMessengerRequestBuilder.js.map