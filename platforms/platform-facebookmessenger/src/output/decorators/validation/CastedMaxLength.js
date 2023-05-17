"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastedMaxLength = void 0;
const output_1 = require("@jovotech/output");
function CastedMaxLength(max, options) {
    return function (object, propertyKey) {
        (0, output_1.registerDecorator)({
            name: 'castedMaxLength',
            target: object.constructor,
            propertyName: propertyKey.toString(),
            constraints: [max],
            options,
            validator: {
                validate(value) {
                    if (!value.toString()) {
                        return false;
                    }
                    return value.toString().length <= max;
                },
            },
        });
    };
}
exports.CastedMaxLength = CastedMaxLength;
//# sourceMappingURL=CastedMaxLength.js.map