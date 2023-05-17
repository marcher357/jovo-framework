"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAlexaApi = void 0;
const nock_1 = __importDefault(require("nock"));
function mockAlexaApi(spec) {
    const url = spec.endpoint || 'https://api.amazonalexa.com';
    return (0, nock_1.default)(url, {
        reqheaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spec.permissionToken}`,
        },
    })
        .intercept(spec.path, spec.method)
        .times(spec.times || 1)
        .reply(spec.response.statusCode, spec.response.body);
}
exports.mockAlexaApi = mockAlexaApi;
//# sourceMappingURL=mocks.js.map