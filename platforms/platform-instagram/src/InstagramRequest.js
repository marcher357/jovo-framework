"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramRequest = void 0;
const platform_facebookmessenger_1 = require("@jovotech/platform-facebookmessenger");
class InstagramRequest extends platform_facebookmessenger_1.FacebookMessengerRequest {
    constructor() {
        super(...arguments);
        this.$type = 'instagram';
    }
}
exports.InstagramRequest = InstagramRequest;
//# sourceMappingURL=InstagramRequest.js.map