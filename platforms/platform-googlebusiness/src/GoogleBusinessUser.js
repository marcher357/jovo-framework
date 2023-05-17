"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBusinessUser = void 0;
const framework_1 = require("@jovotech/framework");
class GoogleBusinessUser extends framework_1.JovoUser {
    get id() {
        return this.jovo.$request.conversationId;
    }
}
exports.GoogleBusinessUser = GoogleBusinessUser;
//# sourceMappingURL=GoogleBusinessUser.js.map