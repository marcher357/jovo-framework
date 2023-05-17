"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('setPersistableData', () => {
    test('is expired', () => {
        // expired at current time - session lifetime - one second to make sure it's before the actual expiration
        const expiredAtTimestamp = new Date().getTime() - src_1.DEFAULT_SESSION_EXPIRES_AFTER_SECONDS * 1000 - 1000;
        const persistableSessionData = {
            id: 'foo',
            data: {
                foo: 'bar',
            },
            updatedAt: new Date(expiredAtTimestamp).toISOString(),
        };
        const session = new src_1.JovoSession();
        session.setPersistableData(persistableSessionData);
        expect(session.isNew).toBe(true);
        expect(session.data).toEqual({});
    });
    test('is not expired', () => {
        const persistableSessionData = {
            id: 'foo',
            data: {
                foo: 'bar',
            },
            updatedAt: new Date().toISOString(),
        };
        const session = new src_1.JovoSession();
        session.setPersistableData(persistableSessionData);
        expect(session.isNew).toBe(false);
        expect(session.data).toEqual({
            foo: 'bar',
        });
    });
});
//# sourceMappingURL=JovoSession.test.js.map