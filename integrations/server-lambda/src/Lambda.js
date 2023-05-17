"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lambda = void 0;
const framework_1 = require("@jovotech/framework");
class Lambda extends framework_1.Server {
    constructor(event, context, callback) {
        super();
        this.event = event;
        this.context = context;
        this.callback = callback;
        this.isApiGateway = false;
        this.headers = {};
        this.responseHeaders = {
            'Content-Type': 'application/json; charset=utf-8',
        };
        if (typeof event.body !== 'undefined') {
            this.isApiGateway = true;
            this.headers = event.headers;
            this.requestPayload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        }
        else {
            this.requestPayload = event;
        }
    }
    fail(error) {
        const responseData = {
            code: 500,
            msg: error.message,
        };
        if (process.env.NODE_ENV === 'production') {
            responseData.stack = error.stack;
        }
        if (this.isApiGateway) {
            this.callback(error, {
                body: JSON.stringify(responseData),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                isBase64Encoded: false,
                statusCode: 500,
            });
        }
        else {
            this.callback(error, responseData);
        }
    }
    getQueryParams() {
        return this.event.queryStringParameters || {};
    }
    getRequestObject() {
        return this.requestPayload;
    }
    getNativeRequestHeaders() {
        return this.headers;
    }
    hasWriteFileAccess() {
        return false;
    }
    setResponse(response) {
        return new Promise((resolve) => {
            if (this.isApiGateway) {
                this.callback(null, {
                    body: typeof response === 'object' ? JSON.stringify(response) : response,
                    headers: this.responseHeaders,
                    isBase64Encoded: false,
                    statusCode: 200,
                });
            }
            else {
                this.callback(null, response);
            }
            resolve();
        });
    }
    setResponseHeaders(header) {
        this.responseHeaders = header;
    }
}
exports.Lambda = Lambda;
//# sourceMappingURL=Lambda.js.map