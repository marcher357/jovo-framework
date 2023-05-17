"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const utilities_1 = require("./utilities");
describe('constructor config', () => {
    test('components passed and used', () => {
        const app = new src_1.App({
            components: [utilities_1.EmptyComponent],
        });
        expect(app.componentTree.getNodeAt(['EmptyComponent'])).toBeInstanceOf(src_1.ComponentTreeNode);
    });
    test('logging boolean passed and used', async () => {
        var _a, _b, _c, _d;
        // reset env variables for this test, otherwise BasicLogging is never included
        const jestWorkerId = process.env.JEST_WORKER_ID;
        process.env.NODE_ENV = 'development';
        delete process.env.JEST_WORKER_ID;
        const app = new src_1.App({
            logging: true,
        });
        await app.initialize();
        expect((_b = (_a = app.plugins.BasicLogging) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.request).toEqual({
            objects: [],
            maskedObjects: [],
            excludedObjects: [],
            enabled: true,
        });
        expect((_d = (_c = app.plugins.BasicLogging) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.response).toEqual({
            objects: [],
            maskedObjects: [],
            excludedObjects: [],
            enabled: true,
        });
        process.env.NODE_ENV = 'test';
        process.env.JEST_WORKER_ID = jestWorkerId;
    });
    test('logging object passed and used', async () => {
        var _a, _b, _c, _d;
        // reset env variables for this test, otherwise BasicLogging is never included
        const jestWorkerId = process.env.JEST_WORKER_ID;
        process.env.NODE_ENV = 'development';
        delete process.env.JEST_WORKER_ID;
        const app = new src_1.App({
            logging: {
                request: {
                    objects: [],
                },
                response: {
                    objects: [],
                },
            },
        });
        await app.initialize();
        expect((_b = (_a = app.plugins.BasicLogging) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.request).toEqual({
            objects: [],
            maskedObjects: [],
            excludedObjects: [],
            enabled: true,
        });
        expect((_d = (_c = app.plugins.BasicLogging) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.response).toEqual({
            objects: [],
            maskedObjects: [],
            excludedObjects: [],
            enabled: true,
        });
        process.env.NODE_ENV = 'test';
        process.env.JEST_WORKER_ID = jestWorkerId;
    });
});
//# sourceMappingURL=App.test.js.map