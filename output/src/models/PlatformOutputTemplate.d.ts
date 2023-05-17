import { DeepPartial, OmitIndex, PlainObjectType } from '@jovotech/common';
import { MessageValue } from './Message';
import { NormalizedPlatformOutputTemplate } from './NormalizedPlatformOutputTemplate';
export type DenormalizePlatformOutputTemplate<PLATFORM_OUTPUT_TEMPLATE extends NormalizedPlatformOutputTemplate> = Omit<OmitIndex<PLATFORM_OUTPUT_TEMPLATE>, 'message' | 'reprompt' | 'nativeResponse'> & {
    [key: string]: unknown;
    nativeResponse?: DeepPartial<PlainObjectType<Exclude<PLATFORM_OUTPUT_TEMPLATE['nativeResponse'], undefined>>>;
    message?: PLATFORM_OUTPUT_TEMPLATE['message'] | MessageValue[];
    reprompt?: PLATFORM_OUTPUT_TEMPLATE['reprompt'] | MessageValue[];
};
export type PlatformOutputTemplate<RESPONSE extends Record<string, unknown> = Record<string, unknown>> = DenormalizePlatformOutputTemplate<NormalizedPlatformOutputTemplate<RESPONSE>>;
