"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOrInstance = void 0;
const __1 = require("../..");
function IsStringOrInstance(classType, options) {
    return function (object, propertyKey) {
        (0, __1.registerDecorator)({
            name: 'isStringOrInstance',
            target: object.constructor,
            propertyName: propertyKey.toString(),
            constraints: [classType],
            options,
            async: true,
            validator: {
                async validate(value, args) {
                    if (typeof value === 'string' && value.length) {
                        return true;
                    }
                    else if (typeof value === 'object' && value instanceof args.constraints[0]) {
                        const errors = await (0, __1.validate)(value);
                        args.constraints[1] = errors;
                        return !errors.length;
                    }
                    const error = new __1.ValidationError();
                    error.target = object;
                    error.property = propertyKey.toString();
                    error.value = value;
                    error.constraints = {
                        isValidMessage: `$property should either be a non-empty string or a valid ${args.constraints[0].name}-instance`,
                    };
                    error.children = [];
                    args.constraints[1] = [error];
                    return false;
                },
                defaultMessage(args) {
                    const eachText = (options === null || options === void 0 ? void 0 : options.each) ? 'each item in ' : '';
                    const errors = args.constraints[1];
                    const errorText = errors
                        .map((error) => {
                        return Object.values(error.constraints || {});
                    })
                        .join(', ');
                    return `$property is invalid: ${eachText}${errorText}`;
                },
            },
        });
    };
}
exports.IsStringOrInstance = IsStringOrInstance;
//# sourceMappingURL=IsStringOrInstance.js.map