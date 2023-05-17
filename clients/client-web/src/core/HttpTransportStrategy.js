"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpTransportStrategy = void 0;
const NetworkTransportStrategy_1 = require("./NetworkTransportStrategy");
class HttpTransportStrategy extends NetworkTransportStrategy_1.NetworkTransportStrategy {
    async send(endpointUrl, request) {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            // TODO maybe we have to omit empty values
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
}
exports.HttpTransportStrategy = HttpTransportStrategy;
//# sourceMappingURL=HttpTransportStrategy.js.map