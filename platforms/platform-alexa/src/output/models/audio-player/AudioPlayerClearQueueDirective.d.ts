import { EnumLike } from '@jovotech/framework';
export declare enum ClearBehavior {
    Enqueued = "CLEAR_ENQUEUED",
    All = "CLEAR_ALL"
}
export type ClearBehaviorLike = EnumLike<ClearBehavior>;
export declare class AudioPlayerClearQueueDirective {
    type: 'AudioPlayer.ClearQueue';
    clearBehavior: ClearBehaviorLike;
}
