import { Template } from '../template/Template';
import { FileAttachment } from './FileAttachment';
export declare enum MessageAttachmentType {
    Image = "image",
    Audio = "audio",
    Video = "video",
    File = "file",
    Template = "template"
}
export declare class MessageAttachment {
    type: MessageAttachmentType;
    payload: FileAttachment | Template;
}
