"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeviceLocationApi_1 = require("../src/api/DeviceLocationApi");
const AlexaApi_1 = require("../src/api/AlexaApi");
const mocks_1 = require("./mocks");
const ENDPOINT = 'https://mock.alexa.com';
test('NO_USER_PERMISSION', async () => {
    (0, mocks_1.mockAlexaApi)({
        method: 'GET',
        permissionToken: 'perm_token',
        path: '/v1/devices/device_id/settings/address/countryAndPostalCode',
        endpoint: ENDPOINT,
        response: {
            statusCode: 401,
            body: {
                code: 'NO_USER_PERMISSION',
                message: 'Access to this resource has not yet been requested.',
            },
        },
    });
    try {
        await (0, DeviceLocationApi_1.getDeviceLocation)(ENDPOINT, 'device_id', 'perm_token');
    }
    catch (e) {
        expect(e.code).toBe(AlexaApi_1.AlexaApiErrorCode.NO_USER_PERMISSION);
    }
});
test('DEVICE_NOT_SUPPORTED', async () => {
    (0, mocks_1.mockAlexaApi)({
        method: 'GET',
        permissionToken: 'perm_token',
        path: '/v1/devices/device_id/settings/address/countryAndPostalCode',
        endpoint: ENDPOINT,
        response: {
            statusCode: 403,
            body: {
                code: 'DEVICE_NOT_SUPPORTED',
            },
        },
    });
    try {
        await (0, DeviceLocationApi_1.getDeviceLocation)(ENDPOINT, 'device_id', 'perm_token');
    }
    catch (e) {
        expect(e.code).toBe(AlexaApi_1.AlexaApiErrorCode.DEVICE_NOT_SUPPORTED);
    }
});
test('getDeviceLocation', async () => {
    const LOCATION = {
        countryCode: 'countryCode',
        postalCode: 'postalCode',
        city: 'city',
    };
    (0, mocks_1.mockAlexaApi)({
        method: 'GET',
        permissionToken: 'perm_token',
        path: '/v1/devices/device_id/settings/address/countryAndPostalCode',
        endpoint: ENDPOINT,
        response: {
            statusCode: 200,
            body: LOCATION,
        },
    });
    const res = await (0, DeviceLocationApi_1.getDeviceLocation)(ENDPOINT, 'device_id', 'perm_token');
    expect(res).toEqual(LOCATION);
});
test('getDeviceAddress', async () => {
    const ADDRESS = {
        addressLine1: 'addressLine1',
        addressLine2: 'addressLine2',
        addressLine3: '',
        districtOrCounty: '',
        stateOrRegion: 'stateOrRegion',
        city: 'city',
        countryCode: 'countryCode',
        postalCode: 'postalCode',
    };
    (0, mocks_1.mockAlexaApi)({
        method: 'GET',
        permissionToken: 'perm_token',
        path: '/v1/devices/device_id/settings/address',
        endpoint: ENDPOINT,
        response: {
            statusCode: 200,
            body: ADDRESS,
        },
    });
    const res = await (0, DeviceLocationApi_1.getDeviceAddress)(ENDPOINT, 'device_id', 'perm_token');
    expect(res).toEqual(ADDRESS);
});
//# sourceMappingURL=DeviceLocationApi.test.js.map