"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaDevice = exports.AlexaCapability = void 0;
const framework_1 = require("@jovotech/framework");
const DeviceLocationApi_1 = require("./api/DeviceLocationApi");
const SettingsApi_1 = require("./api/SettingsApi");
var AlexaCapability;
(function (AlexaCapability) {
    AlexaCapability["Apl"] = "ALEXA:APL";
})(AlexaCapability = exports.AlexaCapability || (exports.AlexaCapability = {}));
class AlexaDevice extends framework_1.JovoDevice {
    get id() {
        var _a;
        return (_a = this.jovo.$request.context) === null || _a === void 0 ? void 0 : _a.System.device.deviceId;
    }
    async getLocation() {
        const request = this.jovo.$request;
        return (0, DeviceLocationApi_1.getDeviceLocation)(request.getApiEndpoint(), request.getDeviceId(), request.getApiAccessToken());
    }
    async getAddress() {
        const request = this.jovo.$request;
        return (0, DeviceLocationApi_1.getDeviceAddress)(request.getApiEndpoint(), request.getDeviceId(), request.getApiAccessToken());
    }
    async getTimeZone() {
        const request = this.jovo.$request;
        return (0, SettingsApi_1.getSystemTimeZone)(request.getApiEndpoint(), request.getDeviceId(), request.getApiAccessToken());
    }
}
exports.AlexaDevice = AlexaDevice;
//# sourceMappingURL=AlexaDevice.js.map