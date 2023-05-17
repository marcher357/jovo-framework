"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySynonymsContainValue = void 0;
const output_1 = require("@jovotech/output");
function EntitySynonymsContainValue(options) {
    return function (target, propertyKey) {
        (0, output_1.registerDecorator)({
            name: 'entitySynonymsContainValue',
            target: target.constructor,
            propertyName: propertyKey.toString(),
            constraints: [],
            options,
            validator: {
                validate(value, args) {
                    const entityValue = args.object.value;
                    if (!value.includes(entityValue)) {
                        args.constraints[0] = '$property must contain exactly one synonym equal to value';
                        return false;
                    }
                    return true;
                },
                defaultMessage(args) {
                    return args.constraints[0];
                },
            },
        });
    };
}
exports.EntitySynonymsContainValue = EntitySynonymsContainValue;
//# sourceMappingURL=EntitySynonymsContainValue.js.map