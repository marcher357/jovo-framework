"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessenger = void 0;
const framework_1 = require("@jovotech/framework");
class FacebookMessenger extends framework_1.AsyncJovo {
    sendResponse(response) {
        return this.$platform.sendData(response);
    }
}
exports.FacebookMessenger = FacebookMessenger;
//# sourceMappingURL=FacebookMessenger.js.map