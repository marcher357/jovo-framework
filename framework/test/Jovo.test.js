"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const utilities_1 = require("./utilities");
const app = {};
const platform = new utilities_1.ExamplePlatform();
const server = new utilities_1.ExampleServer({
    input: {},
});
const middlewareCollection = new src_1.MiddlewareCollection();
const handleRequest = { app, platform, server, middlewareCollection };
describe('Jovo.$send', () => {
    const jovo = platform.createJovoInstance(app, handleRequest);
    beforeEach(() => {
        jovo.$output = [];
    });
    test('string passed', async () => {
        await jovo.$send('Hello');
        await jovo.$send('World');
        expect(jovo.$output).toEqual([{ message: 'Hello' }, { message: 'World' }]);
    });
    test('object passed', async () => {
        await jovo.$send({
            message: 'Hello',
        });
        await jovo.$send({
            message: 'world',
        });
        expect(jovo.$output).toEqual([{ message: 'Hello' }, { message: 'world' }]);
    });
    test('array passed', async () => {
        await jovo.$send([
            {
                message: 'Hello',
            },
        ]);
        await jovo.$send([
            {
                message: 'world',
            },
        ]);
        expect(jovo.$output).toEqual([
            {
                message: 'Hello',
            },
            {
                message: 'world',
            },
        ]);
    });
    test('Output class passed', async () => {
        class ExampleOutput extends src_1.BaseOutput {
            build() {
                return {
                    message: 'Hello world',
                };
            }
        }
        await jovo.$send(ExampleOutput);
        expect(jovo.$output).toEqual([
            {
                message: 'Hello world',
            },
        ]);
    });
    test('Output class internal properties overwritten', async () => {
        class ExampleOutput extends src_1.BaseOutput {
            build() {
                return {
                    message: 'Hello',
                };
            }
        }
        await jovo.$send(ExampleOutput);
        await jovo.$send(ExampleOutput, {
            message: 'world',
        });
        expect(jovo.$output).toEqual([
            {
                message: 'Hello',
            },
            {
                message: 'world',
            },
        ]);
    });
    test('Output class internal properties overwritten (boolean values)', async () => {
        class ExampleOutput extends src_1.BaseOutput {
            build() {
                return {
                    message: 'Hello',
                    listen: true,
                };
            }
        }
        await jovo.$send(ExampleOutput, {
            message: 'world',
            listen: false,
        });
        expect(jovo.$output).toEqual([
            {
                message: 'world',
                listen: false,
            },
        ]);
    });
});
test('AsyncJovo.$send', async () => {
    class ExamplePlatformAsyncJovo extends src_1.AsyncJovo {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendResponse(response) {
            return Promise.resolve();
        }
    }
    const jovo = new ExamplePlatformAsyncJovo(app, handleRequest, platform);
    // wrap sendResponse with jest.fn to detect times the method has been called
    const sendResponseMethod = jovo.sendResponse;
    jovo.sendResponse = jest.fn(sendResponseMethod);
    await jovo.$send('Hello');
    await jovo.$send({ message: 'world' });
    expect(jovo.sendResponse).toHaveBeenCalledTimes(2);
    expect(jovo.$output).toEqual([{ message: 'Hello' }, { message: 'world' }]);
});
//# sourceMappingURL=Jovo.test.js.map