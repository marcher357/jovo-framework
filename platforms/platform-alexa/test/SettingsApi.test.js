"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsApi_1 = require("../src/api/SettingsApi");
const mocks_1 = require("./mocks");
const ENDPOINT = 'https://mock.alexa.com';
test('getSystemTimeZone', async () => {
    (0, mocks_1.mockAlexaApi)({
        method: 'GET',
        permissionToken: 'perm_token',
        path: '/v2/devices/device_id/settings/System.timeZone',
        endpoint: ENDPOINT,
        response: {
            statusCode: 200,
            body: 'Australia/Brisbane',
        },
    });
    const res = await (0, SettingsApi_1.getSystemTimeZone)(ENDPOINT, 'device_id', 'perm_token');
    expect(res).toEqual('Australia/Brisbane');
});
//# sourceMappingURL=SettingsApi.test.js.map