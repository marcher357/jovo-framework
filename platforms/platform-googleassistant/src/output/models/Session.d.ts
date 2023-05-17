import { EnumLike } from '@jovotech/framework';
import { Image } from './common/Image';
import { OpenUrl } from './common/OpenUrl';
export declare class EntryDisplay {
    title: string;
    description?: string;
    image?: Image;
    footer?: string;
    openUrl?: OpenUrl;
}
export declare class Entry {
    name: string;
    synonyms: string[];
    display?: EntryDisplay;
}
export declare class SynonymType {
    entries: Entry[];
}
export declare enum TypeOverrideMode {
    Unspecified = "TYPE_UNSPECIFIED",
    Replace = "TYPE_REPLACE",
    Merge = "TYPE_MERGE"
}
export type TypeOverrideModeLike = EnumLike<TypeOverrideMode>;
export declare class SessionParamsReprompts {
    NO_INPUT_1?: string;
    NO_INPUT_2?: string;
    NO_INPUT_FINAL?: string;
}
export declare class SessionParams {
    [key: string]: unknown;
    _GOOGLE_ASSISTANT_REPROMPTS_?: SessionParamsReprompts;
    _GOOGLE_ASSISTANT_SELECTION_INTENT_?: string;
}
export declare class TypeOverride {
    name: string;
    typeOverrideMode: TypeOverrideModeLike;
    synonym?: SynonymType;
}
export declare class Session {
    id: string;
    params: SessionParams;
    typeOverrides?: TypeOverride[];
    languageCode: string;
}
