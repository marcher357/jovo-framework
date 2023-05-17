import { EnumLike } from '@jovotech/framework';
export declare enum Capability {
    Unspecified = "UNSPECIFIED",
    Speech = "SPEECH",
    RichResponse = "RICH_RESPONSE",
    LongFormAudio = "LONG_FORM_AUDIO",
    InteractiveCanvas = "INTERACTIVE_CANVAS",
    WebLink = "WEB_LINK"
}
export type CapabilityLike = EnumLike<Capability>;
export declare class TimeZone {
    id: string;
    version?: string;
}
export declare class Device {
    capabilities: CapabilityLike[];
    timeZone?: TimeZone;
}
