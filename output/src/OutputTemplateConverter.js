"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputTemplateConverter = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const _1 = require(".");
const OutputValidationError_1 = require("./errors/OutputValidationError");
class OutputTemplateConverter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    async validateOutput(output) {
        return this.validate(output, _1.NormalizedOutputTemplate);
    }
    async validateResponse(response) {
        return this.validate(response, this.strategy.responseClass);
    }
    async toResponse(output) {
        const normalizedOutput = this.strategy.normalizeOutput(output);
        if (this.shouldValidate('before')) {
            const errors = await this.validateOutput(normalizedOutput);
            if (errors.length) {
                throw new OutputValidationError_1.OutputValidationError(errors, 'Can not convert.\n');
            }
        }
        const response = this.strategy.toResponse(normalizedOutput);
        if (this.shouldValidate('after')) {
            const errors = await this.validateResponse(response);
            if (errors.length) {
                throw new OutputValidationError_1.OutputValidationError(errors, 'Conversion caused invalid response.\n');
            }
        }
        return response;
    }
    async fromResponse(response) {
        const responseInstance = this.strategy.normalizeResponse(response);
        if (this.shouldValidate('before')) {
            const errors = await this.validateResponse(responseInstance);
            if (errors.length) {
                throw new OutputValidationError_1.OutputValidationError(errors, 'Can not parse.\n');
            }
        }
        const output = this.strategy.fromResponse(responseInstance);
        if (this.shouldValidate('after')) {
            const errors = await this.validateOutput(output);
            if (errors.length) {
                throw new OutputValidationError_1.OutputValidationError(errors, 'Conversion caused invalid output.\n');
            }
        }
        return output;
    }
    shouldValidate(key) {
        if (!key) {
            return !!this.strategy.config.validation;
        }
        return typeof this.strategy.config.validation === 'object'
            ? this.strategy.config.validation[key]
            : this.strategy.config.validation;
    }
    async validate(objOrArray, targetClass) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const getInstance = (item) => (0, class_transformer_1.plainToClass)(targetClass, item);
        if (Array.isArray(objOrArray)) {
            const errorMatrix = await Promise.all(objOrArray.map((item) => (0, class_validator_1.validate)(getInstance(item))));
            // TODO: maybe modify key or something to indicate better which item was invalid
            return errorMatrix.reduce((acc, curr) => {
                acc.push(...curr);
                return acc;
            }, []);
        }
        else {
            return (0, class_validator_1.validate)(getInstance(objOrArray));
        }
    }
}
exports.OutputTemplateConverter = OutputTemplateConverter;
//# sourceMappingURL=OutputTemplateConverter.js.map