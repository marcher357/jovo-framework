"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('toSSML', () => {
    test('plain text', () => {
        expect(src_1.SsmlUtilities.toSSML('foo')).toBe('<speak>foo</speak>');
    });
    test('ssml', () => {
        expect(src_1.SsmlUtilities.toSSML('<speak>foo</speak>')).toBe('<speak>foo</speak>');
    });
});
describe('removeSSML', () => {
    test('plain text', () => {
        expect(src_1.SsmlUtilities.removeSSML('foo')).toBe('foo');
    });
    test('ssml', () => {
        expect(src_1.SsmlUtilities.removeSSML('<speak>foo<break time="300ms" /></speak>')).toBe('foo');
    });
});
describe('removeSSMLSpeakTags', () => {
    test('plain text', () => {
        expect(src_1.SsmlUtilities.removeSSMLSpeakTags('foo')).toBe('foo');
    });
    test('ssml', () => {
        expect(src_1.SsmlUtilities.removeSSMLSpeakTags('<speak>foo<break time="300ms" /></speak>')).toBe('foo<break time="300ms" />');
    });
});
//# sourceMappingURL=SsmlUtilities.test.js.map