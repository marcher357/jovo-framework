"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const utilities_1 = require("../utilities");
class ExampleInterpretationPlugin extends src_1.InterpretationPlugin {
    constructor() {
        super(...arguments);
        this.targetSampleRate = 16000;
    }
    getDefaultConfig() {
        return {
            input: {
                supportedTypes: [src_1.InputType.Text, src_1.InputType.TranscribedSpeech, src_1.InputType.Speech],
            },
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async processAudio(jovo, audio) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async processText(jovo, text) {
        return;
    }
}
test('Invalid parent: Platform expected', () => {
    const extensible = new utilities_1.ExampleExtensible();
    const plugin = new ExampleInterpretationPlugin();
    expect(() => {
        plugin.mount(extensible);
    }).toThrowError(src_1.InvalidParentError);
});
describe('interpretation', () => {
    describe('asr', () => {
        test('supported - no result', async () => {
            const plugin = new ExampleInterpretationPlugin();
            const processAudioMethod = plugin.processAudio;
            plugin.processAudio = jest.fn(processAudioMethod);
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            app.hook('after.interpretation.asr', (jovo) => {
                expect(jovo.$input.asr).toBe(undefined);
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Speech, audio: { sampleRate: 16000, base64: '<base64-content>' } },
            });
            await app.handle(server);
            expect(plugin.processAudio).toHaveBeenCalled();
        });
        test('supported - asr result', async () => {
            const plugin = new ExampleInterpretationPlugin();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            plugin.processAudio = async function (jovo, audio) {
                return {
                    text: 'Hello world',
                };
            };
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            app.hook('after.interpretation.asr', (jovo) => {
                expect(jovo.$input.asr).toEqual({ text: 'Hello world' });
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Speech, audio: { sampleRate: 16000, base64: '<base64-content>' } },
            });
            await app.handle(server);
        });
        test('not supported', async () => {
            const plugin = new ExampleInterpretationPlugin();
            const processAudioMethod = plugin.processAudio;
            plugin.processAudio = jest.fn(processAudioMethod);
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Launch },
            });
            await app.handle(server);
            expect(plugin.processAudio).not.toHaveBeenCalled();
        });
    });
    describe('nlu', () => {
        test('supported - no result', async () => {
            const plugin = new ExampleInterpretationPlugin();
            const processTextMethod = plugin.processText;
            plugin.processText = jest.fn(processTextMethod);
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            app.hook('after.interpretation.nlu', (jovo) => {
                expect(jovo.$input.nlu).toBe(undefined);
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Text, text: '<text>' },
            });
            await app.handle(server);
            expect(plugin.processText).toHaveBeenCalled();
        });
        test('supported - nlu result', async () => {
            const plugin = new ExampleInterpretationPlugin();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            plugin.processText = async function (jovo, audio) {
                return {
                    intent: 'ExampleIntent',
                };
            };
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            app.hook('after.interpretation.nlu', (jovo) => {
                expect(jovo.$input.nlu).toEqual({ intent: 'ExampleIntent' });
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Text, text: '<text>' },
            });
            await app.handle(server);
        });
        test('not supported', async () => {
            const plugin = new ExampleInterpretationPlugin();
            const processTextMethod = plugin.processText;
            plugin.processText = jest.fn(processTextMethod);
            const app = new src_1.App({
                plugins: [
                    new utilities_1.ExamplePlatform({
                        plugins: [plugin],
                    }),
                ],
            });
            const server = new utilities_1.ExampleServer({
                input: { type: src_1.InputType.Launch },
            });
            await app.handle(server);
            expect(plugin.processText).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=InterpretationPlugin.test.js.map