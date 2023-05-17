"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const utilities_1 = require("./utilities");
test('Invalid parent: HandleRequest expected', () => {
    const extensible = new utilities_1.ExampleExtensible();
    const platform = new utilities_1.ExamplePlatform();
    expect(() => {
        platform.mount(extensible);
    }).toThrowError(src_1.InvalidParentError);
});
describe('middlewareCollection', () => {
    test('no middlewareCollection was specified: default set used', () => {
        const platform = new utilities_1.ExamplePlatform();
        expect(Object.keys(platform.middlewareCollection.middlewares)).toEqual(src_1.APP_MIDDLEWARES);
    });
    test('middlewareCollection was specified: default overwritten', () => {
        const platform = new utilities_1.EmptyPlatform();
        expect(Object.keys(platform.middlewareCollection.middlewares)).toHaveLength(0);
    });
});
describe('enableDatabaseSessionStorage', () => {
    test('no DbPlugin installed', async () => {
        const platform = new utilities_1.ExamplePlatform();
        const enableDatabaseSessionStorageMethod = platform.enableDatabaseSessionStorage;
        platform.enableDatabaseSessionStorage = jest.fn(enableDatabaseSessionStorageMethod);
        const app = new src_1.App({
            plugins: [platform],
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {},
        });
        await app.handle(server);
        expect(platform.enableDatabaseSessionStorage).toHaveBeenCalled();
    });
    test('DbPlugin installed', async () => {
        class ExampleDbPlugin extends src_1.DbPlugin {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            loadData(userId, jovo) {
                return Promise.resolve(undefined);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            saveData(userId, jovo) {
                return Promise.resolve(undefined);
            }
        }
        const app = new src_1.App({
            plugins: [new utilities_1.ExamplePlatform(), new ExampleDbPlugin()],
        });
        app.hook('after.request.end', (jovo) => {
            var _a, _b, _c;
            expect((_c = (_b = (_a = jovo.$config.plugin) === null || _a === void 0 ? void 0 : _a.ExampleDbPlugin) === null || _b === void 0 ? void 0 : _b.storedElements) === null || _c === void 0 ? void 0 : _c.session).toBe(true);
        });
        await app.initialize();
        const server = new utilities_1.ExampleServer({
            input: {},
        });
        await app.handle(server);
    });
});
//# sourceMappingURL=Platform.test.js.map