"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramOutputTemplateConverterStrategy = void 0;
const platform_facebookmessenger_1 = require("@jovotech/platform-facebookmessenger");
const InstagramResponse_1 = require("../InstagramResponse");
class InstagramOutputTemplateConverterStrategy extends platform_facebookmessenger_1.FacebookMessengerOutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.responseClass = InstagramResponse_1.InstagramResponse;
        this.platformName = 'instagram';
    }
}
exports.InstagramOutputTemplateConverterStrategy = InstagramOutputTemplateConverterStrategy;
//# sourceMappingURL=InstagramOutputTemplateConverterStrategy.js.map