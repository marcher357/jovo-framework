"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const en = {
    translation: {
        WELCOME: 'Welcome',
        WELCOME_WITH_PARAMETER: 'Welcome {{firstname}} {{lastname}}',
        WELCOME_NESTED: {
            first: 'Welcome',
            second: 'my friend',
        },
        WELCOME_ARRAY: ['Welcome', 'Hello'],
    },
};
describe('constructor', () => {
    let app;
    beforeEach(async () => {
        app = new src_1.App({
            i18n: {
                resources: { en },
                lng: 'en',
            },
        });
        await app.i18n.initialize();
    });
    test('return translated string for key WELCOME', async () => {
        const str = app.i18n.t('WELCOME');
        expect(str).toEqual('Welcome');
    });
    test('return translated string for key with parameters', async () => {
        const str = app.i18n.t('WELCOME_WITH_PARAMETER', { firstname: 'John', lastname: 'Doe' });
        expect(str).toEqual('Welcome John Doe');
    });
    test('return translated string for nested key', async () => {
        const str = app.i18n.t('WELCOME_NESTED.first');
        expect(str).toEqual('Welcome');
    });
    test('check property for nested object property', async () => {
        const obj = app.i18n.t('WELCOME_NESTED');
        expect(obj).toHaveProperty('first');
    });
    test('check for result is an array', async () => {
        const arr = app.i18n.t('WELCOME_ARRAY');
        expect(arr.length).toEqual(2);
        expect(arr[0]).toEqual('Welcome');
        expect(Array.isArray(arr)).toBeTruthy();
    });
    test('result is an object with correct properties', async () => {
        const obj = app.i18n.t('WELCOME_NESTED');
        expect(obj.first).toEqual('Welcome');
        expect(obj.second).toEqual('my friend');
    });
});
//# sourceMappingURL=i18next.test.js.map