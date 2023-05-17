"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_1 = require("@jovotech/output");
const src_1 = require("../src");
const converter = new output_1.OutputTemplateConverter(new src_1.AlexaOutputTemplateConverterStrategy({
    validation: false,
}));
// Due to AlexaOutputTemplateConverterStrategy extending SingleResponseOutputTemplateConverterStrategy no tests are required for output arrays
describe('toResponse', () => {
    describe('listen', () => {
        test('undefined passed', async () => {
            const response = await converter.toResponse({
                message: 'Hello world',
            });
            expect(response.response.shouldEndSession).toBe(false);
        });
        describe('boolean passed', () => {
            test('true', async () => {
                const response = await converter.toResponse({
                    message: 'Hello world',
                    listen: true,
                });
                expect(response.response.shouldEndSession).toBe(false);
            });
            test('false passed', async () => {
                const response = await converter.toResponse({
                    message: 'Hello world',
                    listen: false,
                });
                expect(response.response.shouldEndSession).toBe(true);
            });
        });
        test('dynamic entities passed', async () => {
            var _a;
            const response = await converter.toResponse({
                message: 'Hello world',
                listen: {
                    entities: {
                        types: {
                            ColorType: {
                                values: [
                                    {
                                        id: 'red',
                                        value: 'red',
                                    },
                                ],
                            },
                        },
                    },
                },
            });
            expect((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]).toEqual({
                type: 'Dialog.UpdateDynamicEntities',
                types: [
                    {
                        name: 'ColorType',
                        values: [
                            {
                                id: 'red',
                                name: {
                                    synonyms: undefined,
                                    value: 'red',
                                },
                            },
                        ],
                    },
                ],
                updateBehavior: 'REPLACE',
            });
        });
    });
    describe('message', () => {
        test('undefined passed', async () => {
            const response = await converter.toResponse({
                message: undefined,
            });
            expect(response.response.outputSpeech).toBe(undefined);
        });
        test('string passed', async () => {
            const response = await converter.toResponse({
                message: 'Hello world',
            });
            expect(response.response.outputSpeech).toEqual({
                type: src_1.OutputSpeechType.Ssml,
                ssml: `<speak>Hello world</speak>`,
            });
        });
        describe('object passed', () => {
            test('speech only', async () => {
                const response = await converter.toResponse({
                    message: { speech: 'Hello world' },
                });
                expect(response.response.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Ssml,
                    ssml: `<speak>Hello world</speak>`,
                });
            });
            test('text only', async () => {
                const response = await converter.toResponse({
                    message: { text: 'Hello world' },
                });
                expect(response.response.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Plain,
                    text: 'Hello world',
                });
            });
            test('speech and text', async () => {
                const response = await converter.toResponse({
                    message: { speech: 'Hello world', text: 'Hello world' },
                });
                expect(response.response.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Ssml,
                    ssml: `<speak>Hello world</speak>`,
                });
            });
        });
    });
    describe('reprompt', () => {
        test('undefined passed', async () => {
            const response = await converter.toResponse({
                reprompt: undefined,
            });
            expect(response.response.reprompt).toBe(undefined);
        });
        test('string passed', async () => {
            var _a;
            const response = await converter.toResponse({
                reprompt: 'Hello world',
            });
            expect((_a = response.response.reprompt) === null || _a === void 0 ? void 0 : _a.outputSpeech).toEqual({
                type: src_1.OutputSpeechType.Ssml,
                ssml: `<speak>Hello world</speak>`,
            });
        });
        describe('object passed', () => {
            test('speech only', async () => {
                var _a;
                const response = await converter.toResponse({
                    reprompt: { speech: 'Hello world' },
                });
                expect((_a = response.response.reprompt) === null || _a === void 0 ? void 0 : _a.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Ssml,
                    ssml: `<speak>Hello world</speak>`,
                });
            });
            test('text only', async () => {
                var _a;
                const response = await converter.toResponse({
                    reprompt: { text: 'Hello world' },
                });
                expect((_a = response.response.reprompt) === null || _a === void 0 ? void 0 : _a.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Plain,
                    text: 'Hello world',
                });
            });
            test('speech and text', async () => {
                var _a;
                const response = await converter.toResponse({
                    reprompt: { speech: 'Hello world', text: 'Hello world' },
                });
                expect((_a = response.response.reprompt) === null || _a === void 0 ? void 0 : _a.outputSpeech).toEqual({
                    type: src_1.OutputSpeechType.Ssml,
                    ssml: `<speak>Hello world</speak>`,
                });
            });
        });
    });
    // Probably all APL tests can be improved. They are quite shallow and only test if a directive is set.
    // There are no tests yet to check if the content is correctly set due to the size of APL documents.
    describe('APL enabled', () => {
        beforeAll(() => {
            converter.strategy.config.genericOutputToApl = true;
        });
        afterAll(() => {
            converter.strategy.config.genericOutputToApl =
                converter.strategy.getDefaultConfig().genericOutputToApl;
        });
        describe('card', () => {
            test('undefined passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    card: undefined,
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('object passed', async () => {
                var _a, _b;
                const response = await converter.toResponse({
                    card: {
                        title: 'title',
                        subtitle: 'subtitle',
                        content: 'content',
                    },
                });
                expect((_b = (_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type).toBe('Alexa.Presentation.APL.RenderDocument');
            });
        });
        describe('carousel', () => {
            test('undefined passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    card: undefined,
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('object passed', async () => {
                var _a, _b;
                const response = await converter.toResponse({
                    carousel: {
                        title: 'title',
                        items: [
                            {
                                key: 'first',
                                title: 'first',
                            },
                            { key: 'second', title: 'second' },
                        ],
                    },
                });
                expect((_b = (_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type).toBe('Alexa.Presentation.APL.RenderDocument');
            });
        });
        describe('quickReplies', () => {
            // this is the current behavior but might change in the future
            test('no other APL document passed => ignored', async () => {
                var _a;
                const response = await converter.toResponse({
                    quickReplies: ['first', 'second'],
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('undefined passed', async () => {
                var _a, _b, _c, _d;
                const response = await converter.toResponse({
                    card: { title: 'title' },
                    quickReplies: undefined,
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expect((_d = (_c = (_b = (_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.datasources) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.quickReplies).toEqual([]);
            });
            test('array passed', async () => {
                var _a, _b, _c, _d;
                const response = await converter.toResponse({
                    card: { title: 'title' },
                    quickReplies: ['first', 'second'],
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                expect((_d = (_c = (_b = (_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.datasources) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.quickReplies).toEqual([
                    { intent: 'first', type: 'QuickReply' },
                    { intent: 'second', type: 'QuickReply' },
                ]);
            });
        });
        describe('list', () => {
            test('undefined passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    list: undefined,
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('object passed', async () => {
                var _a, _b;
                const response = await converter.toResponse({
                    platforms: {
                        alexa: {
                            list: {
                                title: 'title',
                                items: [
                                    {
                                        title: 'first',
                                    },
                                    { title: 'second' },
                                ],
                            },
                        },
                    },
                });
                expect((_b = (_a = response.response.directives) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type).toBe('Alexa.Presentation.APL.RenderDocument');
            });
        });
    });
    describe('APL disabled', () => {
        beforeAll(() => {
            converter.strategy.config.genericOutputToApl = false;
        });
        afterAll(() => {
            converter.strategy.config.genericOutputToApl =
                converter.strategy.getDefaultConfig().genericOutputToApl;
        });
        describe('card', () => {
            test('undefined passed', async () => {
                const response = await converter.toResponse({
                    card: undefined,
                });
                expect(response.response.card).toBe(undefined);
            });
            test('object passed', async () => {
                const response = await converter.toResponse({
                    card: {
                        title: 'title',
                        subtitle: 'subtitle',
                        content: 'content',
                    },
                });
                expect(response.response.card).toEqual({
                    type: src_1.CardType.Standard,
                    title: 'title',
                    text: 'content',
                });
            });
        });
        describe('carousel', () => {
            test('undefined passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    card: undefined,
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('object passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    carousel: {
                        title: 'title',
                        items: [
                            {
                                key: 'first',
                                title: 'first',
                            },
                            { key: 'second', title: 'second' },
                        ],
                    },
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
        });
        describe('quickReplies', () => {
            test('undefined passed', async () => {
                const response = await converter.toResponse({
                    card: { title: 'title' },
                    quickReplies: undefined,
                });
                expect(response.response.directives || []).toEqual([]);
            });
            test('array passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    card: { title: 'title' },
                    quickReplies: ['first', 'second'],
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
        });
        describe('list', () => {
            test('undefined passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    list: undefined,
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
            test('object passed', async () => {
                var _a;
                const response = await converter.toResponse({
                    platforms: {
                        alexa: {
                            list: {
                                title: 'title',
                                items: [
                                    {
                                        title: 'first',
                                    },
                                    { title: 'second' },
                                ],
                            },
                        },
                    },
                });
                expect(((_a = response.response.directives) === null || _a === void 0 ? void 0 : _a.length) || 0).toBe(0);
            });
        });
    });
    test('nativeResponse', async () => {
        const response = await converter.toResponse({
            message: 'Hello world',
            platforms: {
                alexa: {
                    nativeResponse: {
                        sessionAttributes: {
                            foo: 'bar',
                        },
                    },
                },
            },
        });
        expect(response.sessionAttributes).toEqual({
            foo: 'bar',
        });
    });
});
describe('fromResponse', () => {
    describe('listen', () => {
        test('shouldEndSession undefined', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    shouldEndSession: undefined,
                },
            });
            expect(output.listen).toBe(undefined);
        });
        describe('boolean', () => {
            test('shouldEndSession true', async () => {
                const output = await converter.fromResponse({
                    version: '',
                    response: {
                        shouldEndSession: true,
                    },
                });
                expect(output.listen).toBe(false);
            });
            test('shouldEndSession false', async () => {
                const output = await converter.fromResponse({
                    version: '',
                    response: {
                        shouldEndSession: false,
                    },
                });
                expect(output.listen).toBe(true);
            });
        });
    });
    describe('message', () => {
        test('prompt undefined', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    outputSpeech: undefined,
                },
            });
            expect(output.message).toBe(undefined);
        });
        test('speech prompt', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    outputSpeech: {
                        type: src_1.OutputSpeechType.Ssml,
                        ssml: `<speak>Hello world</speak>`,
                    },
                },
            });
            expect(output.message).toEqual({ speech: `<speak>Hello world</speak>` });
        });
        test('plain prompt', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    outputSpeech: {
                        type: src_1.OutputSpeechType.Plain,
                        text: 'Hello world',
                    },
                },
            });
            expect(output.message).toEqual({ text: 'Hello world' });
        });
    });
    describe('reprompt', () => {
        test('reprompt undefined', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    reprompt: undefined,
                },
            });
            expect(output.reprompt).toBe(undefined);
        });
        test('speech reprompt', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    reprompt: {
                        outputSpeech: {
                            type: src_1.OutputSpeechType.Ssml,
                            ssml: `<speak>Hello world</speak>`,
                        },
                    },
                },
            });
            expect(output.reprompt).toEqual({ speech: `<speak>Hello world</speak>` });
        });
        test('plain reprompt', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    reprompt: {
                        outputSpeech: {
                            type: src_1.OutputSpeechType.Plain,
                            text: 'Hello world',
                        },
                    },
                },
            });
            expect(output.reprompt).toEqual({ text: 'Hello world' });
        });
    });
    describe('card', () => {
        test('card undefined', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    card: undefined,
                },
            });
            expect(output.card).toBe(undefined);
        });
        test('card is set', async () => {
            const output = await converter.fromResponse({
                version: '',
                response: {
                    card: {
                        type: src_1.CardType.Standard,
                        title: 'title',
                        image: {
                            smallImageUrl: 'foo',
                        },
                    },
                },
            });
            expect(output.card).toEqual({ title: 'title', imageUrl: 'foo' });
        });
    });
});
//# sourceMappingURL=AlexaOutputTemplateConverterStrategy.test.js.map