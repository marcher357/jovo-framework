import { EnumLike } from '@jovotech/framework';
import { RbmSuggestion } from './RbmSuggestion';
export declare class RbmCardContent {
    title?: string;
    description?: string;
    media?: RbmMedia;
    suggestions?: RbmSuggestion[];
}
export declare enum Height {
    Unspecified = "HEIGHT_UNSPECIFIED",
    Short = "SHORT",
    Medium = "MEDIUM",
    Tall = "TALL"
}
export type HeightLike = EnumLike<Height>;
export declare class RbmMedia {
    file_uri: string;
    thumbnail_uri?: string;
    height?: HeightLike;
}
