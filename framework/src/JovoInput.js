"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovoInput = exports.DEFAULT_INPUT_TYPE = void 0;
const common_1 = require("@jovotech/common");
exports.DEFAULT_INPUT_TYPE = common_1.InputType.Intent;
class JovoInput {
    constructor(typeOrObject = exports.DEFAULT_INPUT_TYPE) {
        // make sure a type always exists, due to the possibility of passing a partial input-object, a type could be omitted
        this.type = typeof typeOrObject === 'string' ? typeOrObject : exports.DEFAULT_INPUT_TYPE;
        if (typeof typeOrObject === 'object') {
            Object.assign(this, typeOrObject);
        }
    }
    getText() {
        var _a;
        return this.text || ((_a = this.asr) === null || _a === void 0 ? void 0 : _a.text);
    }
    getIntentName() {
        var _a;
        function getIntentName(intent) {
            return typeof intent === 'string' ? intent : intent.name;
        }
        return this.intent
            ? getIntentName(this.intent)
            : ((_a = this.nlu) === null || _a === void 0 ? void 0 : _a.intent)
                ? getIntentName(this.nlu.intent)
                : undefined;
    }
}
exports.JovoInput = JovoInput;
//# sourceMappingURL=JovoInput.js.map