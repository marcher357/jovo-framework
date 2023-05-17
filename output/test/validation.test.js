"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const src_1 = require("../src");
function transformAndValidate(objClass, obj, options) {
    return (0, src_1.validate)((0, class_transformer_1.plainToClass)(objClass, obj), options);
}
function testStringProperty(objClass, propertyKey, additionalData = {}) {
    test(`${propertyKey} - invalid: empty`, async () => {
        await validateAndExpectLength(objClass, Object.assign(Object.assign({}, additionalData), { [propertyKey]: '' }), 1);
    });
    test(`${propertyKey} - invalid: wrong type`, async () => {
        await validateAndExpectLength(objClass, Object.assign(Object.assign({}, additionalData), { [propertyKey]: 2 }), 1);
    });
    test(`${propertyKey} - valid: string`, async () => {
        await validateAndExpectLength(objClass, Object.assign(Object.assign({}, additionalData), { [propertyKey]: 'foo' }), 0);
    });
}
function testOptionalStringProperty(objClass, propertyKey, additionalData = {}) {
    test(`${propertyKey} - optional`, async () => {
        await validateAndExpectLength(objClass, Object.assign(Object.assign({}, additionalData), { [propertyKey]: undefined }), 0);
    });
    testStringProperty(objClass, propertyKey, additionalData);
}
async function validateAndExpectLength(objClass, obj, expectedLength, options) {
    const errors = await transformAndValidate(objClass, obj, options);
    expect(errors).toHaveLength(expectedLength);
}
describe('validation - QuickReply', () => {
    testStringProperty(src_1.QuickReply, 'text');
    testOptionalStringProperty(src_1.QuickReply, 'value', {
        text: 'foo',
    });
});
describe('validation - Message', () => {
    testStringProperty(src_1.Message, 'speech');
    testOptionalStringProperty(src_1.Message, 'text', {
        speech: 'foo',
    });
});
describe('validation - Card', () => {
    testStringProperty(src_1.Card, 'title');
    testOptionalStringProperty(src_1.Card, 'key', {
        title: 'foo',
    });
    testOptionalStringProperty(src_1.Card, 'subtitle', {
        title: 'foo',
    });
    test('imageUrl - optional', async () => {
        await validateAndExpectLength(src_1.Card, {
            title: 'foo',
        }, 0);
    });
    test('imageUrl - invalid: empty', async () => {
        await validateAndExpectLength(src_1.Card, {
            title: 'foo',
            imageUrl: '',
        }, 1);
    });
    test('imageUrl - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.Card, {
            title: 'foo',
            imageUrl: 2,
        }, 1);
    });
    test('imageUrl - invalid: no url', async () => {
        await validateAndExpectLength(src_1.Card, {
            title: 'foo',
            imageUrl: 'foo',
        }, 1);
    });
    test('imageUrl - valid: url', async () => {
        await validateAndExpectLength(src_1.Card, {
            title: 'foo',
            imageUrl: 'https://placeholder.com',
        }, 0);
    });
});
describe('validation - Carousel', () => {
    test('items - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.Carousel, {
            items: {},
        }, 1);
    });
    test('items - invalid: fewer than 1 element', async () => {
        await validateAndExpectLength(src_1.Carousel, {
            items: [],
        }, 1);
    });
    test('items - invalid: element not a card', async () => {
        await validateAndExpectLength(src_1.Carousel, {
            items: [2],
        }, 1);
    });
    test('items - invalid: invalid element', async () => {
        await validateAndExpectLength(src_1.Carousel, {
            items: [{ title: 2 }],
        }, 1);
    });
    test('items - valid', async () => {
        await validateAndExpectLength(src_1.Carousel, {
            items: [{ title: 'foo' }, { title: 'bar' }],
        }, 0);
    });
    testOptionalStringProperty(src_1.Carousel, 'title', {
        items: [{ title: 'foo' }, { title: 'bar' }],
    });
});
describe('validation - OutputTemplate', () => {
    test(`message - optional`, async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { message: undefined }, 0);
    });
    test(`message - valid: empty`, async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            message: '',
        }, 0);
    });
    test(`message - invalid: wrong type`, async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            message: 2,
        }, 1);
    });
    test(`message - valid: string`, async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            message: 'foo',
        }, 0);
    });
    test('message - invalid: invalid object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            message: {},
        }, 1);
    });
    test('message - valid: object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            message: {
                speech: 'foo',
            },
        }, 0);
    });
    testOptionalStringProperty(src_1.NormalizedOutputTemplate, 'reprompt');
    test('reprompt - invalid: invalid object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            reprompt: {
                speech: '',
            },
        }, 1);
    });
    test('reprompt - valid: object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            reprompt: {
                speech: 'foo',
            },
        }, 0);
    });
    test('listen - optional', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {}, 0);
    });
    test('listen - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            listen: 3,
        }, 1);
    });
    test('listen - valid: boolean', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            listen: true,
        }, 0);
    });
    test('quickReplies - optional', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {}, 0);
    });
    test('quickReplies - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { quickReplies: {} }, 1);
    });
    test('quickReplies - invalid: invalid element', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { quickReplies: [2] }, 1);
    });
    test('quickReplies - valid', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { quickReplies: ['foo', { text: 'bar' }] }, 0);
    });
    test('cards - optional', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {}, 0);
    });
    test('cards - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { card: 2 }, 1);
    });
    test('cards - invalid: invalid object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { card: {} }, 1);
    });
    test('cards - valid', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { card: { title: 'foo' } }, 0);
    });
    test('collection - optional', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {}, 0);
    });
    test('collection - invalid: wrong type', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { carousel: 'foo' }, 1);
    });
    test('collection - invalid: invalid object', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, { carousel: { items: {} } }, 1);
    });
    test('collection - valid', async () => {
        await validateAndExpectLength(src_1.NormalizedOutputTemplate, {
            carousel: {
                items: [{ title: 'foo' }, { title: 'bar' }],
            },
        }, 0);
    });
});
//# sourceMappingURL=validation.test.js.map