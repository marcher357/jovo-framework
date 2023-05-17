"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidTelephonySynthesizeSpeechString = void 0;
const output_1 = require("@jovotech/output");
function IsValidTelephonySynthesizeSpeechString(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidTelephonySynthesizeSpeechString.ts',
        keys: ['text', 'ssml'],
        validate: (value) => {
            if (!(0, output_1.isString)(value)) {
                return '$property must be a string';
            }
            if (!value) {
                return '$property should not be empty';
            }
            return;
        },
    }, validationOptions);
}
exports.IsValidTelephonySynthesizeSpeechString = IsValidTelephonySynthesizeSpeechString;
//# sourceMappingURL=IsValidTelephonySynthesizeSpeechString.js.map