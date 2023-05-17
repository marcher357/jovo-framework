import { Button } from '../button/Button';
import { TemplateBase, TemplateType } from './Template';
export declare class ButtonTemplate extends TemplateBase<TemplateType.Button | 'button'> {
    template_type: TemplateType.Button | 'button';
    text: string;
    buttons: Button[];
}
