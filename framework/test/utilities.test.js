"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('mask()', () => {
    test('should do nothing if the path points to an undefined value', () => {
        const obj = { foo: 'bar' };
        (0, src_1.mask)(obj, ['invalid'], 'MASK');
        expect(obj.foo).toMatch('bar');
    });
    test('should mask the value at the specified path', () => {
        const obj = { foo: 'bar' };
        (0, src_1.mask)(obj, ['foo'], 'MASK');
        expect(obj.foo).toMatch('MASK');
    });
});
describe('copy()', () => {
    test('should throw an error if include and exclude have intersecting values', () => {
        const include = ['foo', 'bar'];
        const exclude = ['foo'];
        expect(src_1.copy.bind(null, {}, { include, exclude })).toThrow('Collision detected during object construction, trying to include/exclude the same properties ["foo"]');
    });
    test('should plainly copy the object if config is not provided', () => {
        const source = { foo: 'bar' };
        const result = (0, src_1.copy)(source);
        source.foo = 'hello';
        // Check that we got a clean copy without reference to source
        expect(source.foo).toMatch('hello');
        expect(result.foo).toMatch('bar');
    });
    test('should include specific properties', () => {
        const source = { foo: 'bar', invalid: 'yes' };
        const result = (0, src_1.copy)(source, { include: ['foo'] });
        expect(result.foo).toMatch('bar');
        expect(result).not.toHaveProperty('invalid');
    });
    test('should exclude specific properties', () => {
        const source = { foo: 'bar', invalid: 'yes' };
        const result = (0, src_1.copy)(source, { exclude: ['invalid'] });
        expect(result.foo).toMatch('bar');
        expect(result).not.toHaveProperty('invalid');
    });
});
//# sourceMappingURL=utilities.test.js.map