import { EnumLike } from '@jovotech/framework';
import { Image } from '../common/Image';
export declare enum MediaType {
    Unspecified = "MEDIA_TYPE_UNSPECIFIED",
    Audio = "AUDIO",
    MediaStatusAck = "MEDIA_STATUS_ACK"
}
export type MediaTypeLike = EnumLike<MediaType>;
export declare enum OptionalMediaControls {
    Unspecified = "OPTIONAL_MEDIA_CONTROLS_UNSPECIFIED",
    Paused = "PAUSED",
    Stopped = "STOPPED"
}
export type OptionalMediaControlsLike = EnumLike<OptionalMediaControls>;
export declare class MediaImage {
    large?: Image;
    icon?: Image;
}
export declare class MediaObject {
    name: string;
    description: string;
    url: string;
    image: MediaImage;
}
export declare class Media {
    mediaType: MediaTypeLike;
    startOffset: string;
    optionalMediaControls?: OptionalMediaControlsLike[];
    mediaObjects: MediaObject[];
}
