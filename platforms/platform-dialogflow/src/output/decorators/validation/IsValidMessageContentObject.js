"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidMessageContentObject = void 0;
const output_1 = require("@jovotech/output");
const KEYS = [
    'text',
    'image',
    'quick_replies',
    'card',
    'payload',
    'simple_responses',
    'basic_card',
    'suggestions',
    'link_out_suggestion',
    'list_select',
    'carousel_select',
    'telephony_play_audio',
    'telephony_synthesize_speech',
    'telephony_transfer_call',
    'rbm_text',
    'rbm_standalone_rich_card',
    'rbm_carousel_rich_card',
    'browse_carousel_card',
    'table_card',
    'media_content',
];
const ACTIONS_ON_GOOGLE_KEYS = [
    'simple_responses',
    'basic_card',
    'suggestions',
    'link_out_suggestion',
    'list_select',
    'carousel_select',
    'browse_carousel_card',
    'table_card',
    'media_content',
];
function IsValidMessageContentObject(validationOptions) {
    return (0, output_1.IsEitherValid)({
        name: 'isValidMessageContentObject',
        keys: KEYS,
        validate: async (value, args) => {
            if (ACTIONS_ON_GOOGLE_KEYS.includes(args.property)) {
                // do not validate actions on google-objects for now
                return;
            }
            if (!(0, output_1.isObject)(value)) {
                return '$property must be an object.';
            }
            const errors = await (0, output_1.validate)(value);
            if (errors.length) {
                return (0, output_1.formatValidationErrors)(errors, {
                    text: '$property is invalid:',
                    delimiter: '\n  - ',
                    path: '$property',
                });
            }
            return;
        },
    }, validationOptions);
}
exports.IsValidMessageContentObject = IsValidMessageContentObject;
//# sourceMappingURL=IsValidMessageContentObject.js.map