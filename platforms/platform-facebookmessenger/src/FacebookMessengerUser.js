"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookMessengerUser = void 0;
const framework_1 = require("@jovotech/framework");
class FacebookMessengerUser extends framework_1.JovoUser {
    get id() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.jovo.$request.messaging) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.sender) === null || _c === void 0 ? void 0 : _c.id;
    }
}
exports.FacebookMessengerUser = FacebookMessengerUser;
//# sourceMappingURL=FacebookMessengerUser.js.map