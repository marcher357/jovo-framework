"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidGameMetaDataString = void 0;
const output_1 = require("@jovotech/output");
function IsValidGameMetaDataString(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidGameMetaDataString',
        keys: ['player_id', 'context_id'],
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
exports.IsValidGameMetaDataString = IsValidGameMetaDataString;
//# sourceMappingURL=IsValidGameMetaDataString.js.map