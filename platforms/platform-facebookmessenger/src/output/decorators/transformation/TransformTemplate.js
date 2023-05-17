"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformTemplate = void 0;
const output_1 = require("@jovotech/output");
const models_1 = require("../../models");
// import should not be shortened or decorator has problems with finding the correct enum
const Template_1 = require("../../models/template/Template");
function TransformTemplate() {
    return (0, output_1.Type)(() => Template_1.TemplateBase, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'template_type',
            subTypes: [
                { value: models_1.ButtonTemplate, name: Template_1.TemplateType.Button },
                { value: models_1.GenericTemplate, name: Template_1.TemplateType.Generic },
                { value: models_1.MediaTemplate, name: Template_1.TemplateType.Media },
                { value: models_1.ReceiptTemplate, name: Template_1.TemplateType.Receipt },
            ],
        },
    });
}
exports.TransformTemplate = TransformTemplate;
//# sourceMappingURL=TransformTemplate.js.map