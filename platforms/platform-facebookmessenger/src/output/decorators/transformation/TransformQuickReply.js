"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformQuickReply = void 0;
const output_1 = require("@jovotech/output");
const models_1 = require("../../models");
// import should not be shortened or decorator has problems with finding the correct enum
const QuickReply_1 = require("../../models/quick-reply/QuickReply");
function TransformQuickReply() {
    return (0, output_1.Type)(() => QuickReply_1.QuickReplyBase, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'content_type',
            subTypes: [
                { value: models_1.UserEmailQuickReply, name: QuickReply_1.QuickReplyContentType.UserEmail },
                { value: models_1.UserPhoneNumberQuickReply, name: QuickReply_1.QuickReplyContentType.UserPhoneNumber },
                { value: models_1.TextQuickReply, name: QuickReply_1.QuickReplyContentType.Text },
            ],
        },
    });
}
exports.TransformQuickReply = TransformQuickReply;
//# sourceMappingURL=TransformQuickReply.js.map