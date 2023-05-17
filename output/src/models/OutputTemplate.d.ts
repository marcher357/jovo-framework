import { OmitIndex } from '@jovotech/common';
import { MessageValue } from './Message';
import { NormalizedOutputTemplate } from './NormalizedOutputTemplate';
import { OutputTemplatePlatforms } from './OutputTemplatePlatforms';
export type DenormalizeOutputTemplate<OUTPUT_TEMPLATE extends NormalizedOutputTemplate> = Omit<OmitIndex<OUTPUT_TEMPLATE>, 'message' | 'reprompt' | 'platforms'> & {
    [key: string]: unknown;
    message?: OUTPUT_TEMPLATE['message'] | MessageValue[];
    reprompt?: OUTPUT_TEMPLATE['reprompt'] | MessageValue[];
    platforms?: OutputTemplatePlatforms;
};
export interface OutputTemplate extends DenormalizeOutputTemplate<NormalizedOutputTemplate> {
}
