"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleServer = void 0;
const src_1 = require("../../src");
const platform_1 = require("./platform");
class ExampleServer extends src_1.Server {
    constructor(request) {
        super();
        this.request = request;
        this.headers = {};
        this.response = new platform_1.ExamplePlatformResponse();
    }
    fail(error) {
        this.response.error = error;
    }
    getNativeRequestHeaders() {
        return {};
    }
    getQueryParams() {
        return {};
    }
    getRequestObject() {
        return this.request;
    }
    hasWriteFileAccess() {
        return false;
    }
    async setResponse(response) {
        this.response = response;
    }
    setResponseHeaders(headers) {
        this.headers = headers;
    }
}
exports.ExampleServer = ExampleServer;
//# sourceMappingURL=server.js.map