"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAttachment = exports.MessageAttachmentType = void 0;
const output_1 = require("@jovotech/output");
const ButtonTemplate_1 = require("../template/ButtonTemplate");
const GenericTemplate_1 = require("../template/GenericTemplate");
const MediaTemplate_1 = require("../template/MediaTemplate");
const ReceiptTemplate_1 = require("../template/ReceiptTemplate");
const Template_1 = require("../template/Template");
const FileAttachment_1 = require("./FileAttachment");
var MessageAttachmentType;
(function (MessageAttachmentType) {
    MessageAttachmentType["Image"] = "image";
    MessageAttachmentType["Audio"] = "audio";
    MessageAttachmentType["Video"] = "video";
    MessageAttachmentType["File"] = "file";
    MessageAttachmentType["Template"] = "template";
})(MessageAttachmentType = exports.MessageAttachmentType || (exports.MessageAttachmentType = {}));
class MessageAttachment {
}
__decorate([
    (0, output_1.IsEnum)(MessageAttachmentType),
    __metadata("design:type", String)
], MessageAttachment.prototype, "type", void 0);
__decorate([
    (0, output_1.IsObject)(),
    (0, output_1.ValidateNested)(),
    (0, output_1.Transform)(({ value, obj }) => {
        let type;
        if (obj.type === MessageAttachmentType.Template) {
            switch (value.template_type) {
                case Template_1.TemplateType.Generic:
                    type = GenericTemplate_1.GenericTemplate;
                    break;
                case Template_1.TemplateType.Button:
                    type = ButtonTemplate_1.ButtonTemplate;
                    break;
                case Template_1.TemplateType.Media:
                    type = MediaTemplate_1.MediaTemplate;
                    break;
                case Template_1.TemplateType.Receipt:
                    type = ReceiptTemplate_1.ReceiptTemplate;
                    break;
                default:
                    type = Template_1.TemplateBase;
            }
        }
        else {
            type = FileAttachment_1.FileAttachment;
        }
        return (0, output_1.plainToClass)(type, value);
    }),
    __metadata("design:type", Object)
], MessageAttachment.prototype, "payload", void 0);
exports.MessageAttachment = MessageAttachment;
//# sourceMappingURL=MessageAttachment.js.map