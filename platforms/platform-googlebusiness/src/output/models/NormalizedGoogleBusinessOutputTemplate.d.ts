import { NormalizedPlatformOutputTemplate } from '@jovotech/output';
import { GoogleBusinessOutputTemplateResponse } from './GoogleBusinessOutputTemplateResponse';
import { Image } from './Image';
import { Suggestion } from './Suggestion';
export declare class NormalizedGoogleBusinessOutputTemplate extends NormalizedPlatformOutputTemplate<GoogleBusinessOutputTemplateResponse> {
    nativeResponse?: GoogleBusinessOutputTemplateResponse;
    fallback?: string;
    image?: Image;
    suggestions?: Suggestion[];
}
