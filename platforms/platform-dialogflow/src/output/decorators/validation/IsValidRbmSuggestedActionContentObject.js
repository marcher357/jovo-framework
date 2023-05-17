"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidRbmSuggestedActionContentObject = void 0;
const output_1 = require("@jovotech/output");
function IsValidRbmSuggestedActionContentObject(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidRbmSuggestedActionContentObject',
        keys: ['dial', 'open_url', 'share_location'],
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
exports.IsValidRbmSuggestedActionContentObject = IsValidRbmSuggestedActionContentObject;
//# sourceMappingURL=IsValidRbmSuggestedActionContentObject.js.map