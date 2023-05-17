"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidSuggestionObject = void 0;
const output_1 = require("@jovotech/output");
function IsValidSuggestionObject(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidSuggestionObject',
        keys: ['reply', 'action', 'liveAgentRequest', 'authenticationRequest'],
        validate: async (value) => {
            if (!(0, output_1.isObject)(value)) {
                return '$property must be an object.';
            }
            const errors = await (0, output_1.validate)(value);
            if (errors.length) {
                return (0, output_1.formatValidationErrors)(errors, {
                    text: '$property is invalid:',
                    delimiter: '\n  - ',
                    path: '$property',
                });
            }
            return;
        },
    }, validationOptions);
}
exports.IsValidSuggestionObject = IsValidSuggestionObject;
//# sourceMappingURL=IsValidSuggestionObject.js.map