"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
class ExampleResponse extends src_1.JovoResponse {
    hasSessionEnded() {
        return false;
    }
}
class ExampleStrategy extends src_1.OutputTemplateConverterStrategy {
    constructor() {
        super(...arguments);
        this.platformName = 'example';
        this.responseClass = ExampleResponse;
    }
    fromResponse() {
        return [];
    }
    toResponse() {
        return [];
    }
}
const strategy = new ExampleStrategy();
describe('prepareOutput', () => {
    describe('platform-specific output is returned', () => {
        test('object passed', () => {
            const preparedOutput = strategy.normalizeOutput({
                message: 'foo',
                platforms: {
                    example: {
                        message: 'bar',
                    },
                },
            });
            expect(preparedOutput).toEqual({
                message: 'bar',
                platforms: {
                    example: {
                        message: 'bar',
                    },
                },
            });
        });
        test('array passed', () => {
            const preparedOutput = strategy.normalizeOutput([
                {
                    message: 'foo',
                    platforms: {
                        example: {
                            message: 'bar',
                        },
                    },
                },
                {
                    message: 'Hello',
                    platforms: {
                        example: {
                            message: 'World',
                        },
                    },
                },
            ]);
            expect(preparedOutput).toEqual([
                {
                    message: 'bar',
                    platforms: {
                        example: {
                            message: 'bar',
                        },
                    },
                },
                {
                    message: 'World',
                    platforms: {
                        example: {
                            message: 'World',
                        },
                    },
                },
            ]);
        });
        test('other platform-specific output-templates are removed', () => {
            const preparedOutput = strategy.normalizeOutput({
                message: 'foo',
                platforms: {
                    example: {
                        message: 'bar',
                    },
                    alexa: {
                        message: 'more',
                    },
                },
            });
            expect(preparedOutput).toEqual({
                message: 'bar',
                platforms: {
                    example: {
                        message: 'bar',
                    },
                },
            });
        });
    });
});
//# sourceMappingURL=OutputTemplateConverterStrategy.test.js.map