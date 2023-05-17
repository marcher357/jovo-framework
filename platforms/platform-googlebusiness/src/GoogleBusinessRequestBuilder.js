"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusinessRequestBuilder = void 0;
const framework_1 = require("@jovotech/framework");
const path_1 = require("path");
const GoogleBusinessRequest_1 = require("./GoogleBusinessRequest");
class GoogleBusinessRequestBuilder extends framework_1.RequestBuilder {
    launch(json) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const launchJson = require((0, path_1.join)(__dirname, '..', '..', 'sample-requests', 'IntentRequest.json'));
        const request = Object.create(GoogleBusinessRequest_1.GoogleBusinessRequest.prototype);
        return Object.assign(request, json || launchJson);
    }
    intent(nameOrJson) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const intentJson = require((0, path_1.join)(__dirname, '..', '..', 'sample-requests', 'IntentRequest.json'));
        const request = Object.create(GoogleBusinessRequest_1.GoogleBusinessRequest.prototype);
        if (typeof nameOrJson === 'string') {
            Object.assign(request, intentJson);
        }
        else {
            Object.assign(request, nameOrJson || intentJson);
        }
        return request;
    }
}
exports.GoogleBusinessRequestBuilder = GoogleBusinessRequestBuilder;
//# sourceMappingURL=GoogleBusinessRequestBuilder.js.map