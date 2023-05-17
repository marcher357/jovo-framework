"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotInitializedError = void 0;
const common_1 = require("@jovotech/common");
class NotInitializedError extends common_1.JovoError {
    constructor(name) {
        super({
            message: `${name} has to be initialized before being used.`,
        });
    }
}
exports.NotInitializedError = NotInitializedError;
//# sourceMappingURL=NotInitializedError.js.map