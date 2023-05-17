"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramPlatform = void 0;
const framework_1 = require("@jovotech/framework");
const platform_facebookmessenger_1 = require("@jovotech/platform-facebookmessenger");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const Instagram_1 = require("./Instagram");
const InstagramDevice_1 = require("./InstagramDevice");
const InstagramRequest_1 = require("./InstagramRequest");
const InstagramUser_1 = require("./InstagramUser");
const output_1 = require("./output");
class InstagramPlatform extends platform_facebookmessenger_1.FacebookMessengerPlatform {
    // Overwrite the constructor to apply typings from InstagramConfig,
    // since we can't pass the type in the generic parameters
    constructor(config) {
        super(config);
        this.id = 'instagram';
        this.outputTemplateConverterStrategy = new output_1.InstagramOutputTemplateConverterStrategy();
        this.jovoClass = Instagram_1.Instagram;
        this.requestClass = InstagramRequest_1.InstagramRequest;
        this.userClass = InstagramUser_1.InstagramUser;
        this.deviceClass = InstagramDevice_1.InstagramDevice;
    }
    isRequestRelated(request) {
        var _a;
        return request.$type === 'instagram' && request.id && request.time && !!((_a = request.messaging) === null || _a === void 0 ? void 0 : _a[0]);
    }
    augmentAppHandle() {
        super.augmentAppHandle();
        const APP_HANDLE = framework_1.App.prototype.handle;
        framework_1.App.prototype.handle = async function (server) {
            var _a;
            const request = server.getRequestObject();
            const isInstagramRequest = (request === null || request === void 0 ? void 0 : request.object) === 'instagram' && Array.isArray(request === null || request === void 0 ? void 0 : request.entry) && ((_a = request === null || request === void 0 ? void 0 : request.entry) === null || _a === void 0 ? void 0 : _a.length);
            if (isInstagramRequest) {
                const responses = [];
                const promises = request.entry.map((entry) => {
                    // Set platform origin on request entry
                    entry.$type = 'instagram';
                    const serverCopy = (0, lodash_clonedeep_1.default)(server);
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    serverCopy.setResponse = async (response) => {
                        responses.push(response);
                    };
                    serverCopy.getRequestObject = () => entry;
                    return APP_HANDLE.call(this, serverCopy);
                });
                await Promise.all(promises);
                return server.setResponse(responses);
            }
            else {
                return APP_HANDLE.call(this, server);
            }
        };
    }
}
exports.InstagramPlatform = InstagramPlatform;
//# sourceMappingURL=InstagramPlatform.js.map