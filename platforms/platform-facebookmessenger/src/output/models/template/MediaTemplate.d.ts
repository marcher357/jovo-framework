import { Button } from '../button/Button';
import { TemplateBase, TemplateType } from './Template';
export declare enum MediaTemplateElementType {
    Image = "image",
    Video = "video"
}
export declare class MediaTemplateElement {
    media_type: MediaTemplateElementType;
    attachment_id?: string;
    url?: string;
    buttons?: Button[];
}
export declare class MediaTemplate extends TemplateBase<TemplateType.Media | 'media'> {
    template_type: TemplateType.Media | 'media';
    sharable: boolean;
    elements: [MediaTemplateElement];
}
