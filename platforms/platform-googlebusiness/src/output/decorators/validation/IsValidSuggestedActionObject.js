"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidSuggestedActionObject = void 0;
const output_1 = require("@jovotech/output");
function IsValidSuggestedActionObject(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidSuggestedActionObject',
        keys: ['openUrlAction', 'dialAction'],
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
exports.IsValidSuggestedActionObject = IsValidSuggestedActionObject;
//# sourceMappingURL=IsValidSuggestedActionObject.js.map