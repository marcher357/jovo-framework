"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@jovotech/framework");
const src_1 = require("../src");
class DebuggerTestServer extends framework_1.TestServer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(request, onResponse) {
        super(request);
        this.onResponse = onResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async setResponse(response) {
        var _a;
        return (_a = this.onResponse) === null || _a === void 0 ? void 0 : _a.call(this, response);
    }
}
class DebuggerTestNluPlugin extends framework_1.NluPlugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async processText(jovo, text) {
        return;
    }
}
const coreRequest = {
    version: '4.0',
    platform: 'jovo-debugger',
    id: '7bd31461-0211-4c92-b642-69a978c2f18c',
    timestamp: '2020-11-23T12:35:36.368Z',
    timeZone: 'Europe/Berlin',
    locale: 'en',
    data: {},
    input: {
        type: 'LAUNCH',
    },
    context: {
        device: {
            id: '1e4jk3b8-h99a-4hg5-8z14-2ec3cfs51b7f',
            capabilities: ['AUDIO', 'TEXT'],
        },
        session: {
            id: '1e4076b8-539a-48d5-8b14-1ec3cf651b7b',
            data: {},
            isNew: true,
            updatedAt: new Date('2020-11-23T12:35:21.345Z'),
        },
        user: {
            id: '67fed000-9f11-4acf-bbbc-1e52e5ea22a9',
            data: {},
        },
    },
};
const mockSocket = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    emit: () => { },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    on: () => { },
};
let jovoDebugger, app;
beforeEach(() => {
    jovoDebugger = new src_1.JovoDebugger({
        skipTests: false,
        nlu: new DebuggerTestNluPlugin(),
        enabled: true,
        modelsPath: '',
        webhookUrl: '',
    });
    jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(jovoDebugger, 'connectToWebhook')
        .mockImplementation(() => Promise.resolve(mockSocket));
    app = new framework_1.App({
        plugins: [jovoDebugger],
    });
});
test('Applying proxies does not break config and plugin references', async () => {
    class TestPlugin extends framework_1.Plugin {
        getDefaultConfig() {
            return { foo: '' };
        }
        mount(parent) {
            parent.middlewareCollection.use('before.request.start', (jovo) => {
                var _a, _b;
                expect(this).toEqual(jovo.$plugins.TestPlugin);
                expect(this.config).toEqual((_a = jovo.$config.plugin) === null || _a === void 0 ? void 0 : _a.TestPlugin);
                this.config.foo = 'bar';
                expect(this.config).toEqual((_b = jovo.$config.plugin) === null || _b === void 0 ? void 0 : _b.TestPlugin);
                parent.stopMiddlewareExecution();
            });
        }
    }
    app.use(new TestPlugin());
    await app.initialize();
    await app.handle(new DebuggerTestServer(coreRequest));
});
//# sourceMappingURL=JovoDebugger.test.js.map