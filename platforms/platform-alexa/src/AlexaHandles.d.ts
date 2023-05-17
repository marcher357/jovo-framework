import { EnumLike, HandleOptions } from '@jovotech/framework';
import { PermissionStatus, PurchaseResultLike } from './interfaces';
export type PermissionType = 'timers' | 'reminders';
export declare enum IspType {
    Upsell = "Upsell",
    Buy = "Buy",
    Cancel = "Cancel"
}
export declare enum AudioPlayerType {
    PlaybackStarted = "AudioPlayer.PlaybackStarted",
    PlaybackNearlyFinished = "AudioPlayer.PlaybackNearlyFinished",
    PlaybackFinished = "AudioPlayer.PlaybackFinished",
    PlaybackStopped = "AudioPlayer.PlaybackStopped",
    PlaybackFailed = "AudioPlayer.PlaybackFailed"
}
export declare enum PlaybackControllerType {
    NextCommandIssued = "PlaybackController.NextCommandIssued",
    PreviousCommandIssued = "PlaybackController.PreviousCommandIssued",
    PlayCommandIssued = "PlaybackController.PlayCommandIssued",
    PauseCommandIssued = "PlaybackController.PauseCommandIssued"
}
export type IspTypeLike = EnumLike<IspType> | string;
export type AudioPlayerTypeLike = EnumLike<AudioPlayerType> | string;
export type PlaybackControllerTypeLike = EnumLike<PlaybackControllerType> | string;
export declare class AlexaHandles {
    static onPermission(status: PermissionStatus, type?: PermissionType): HandleOptions;
    static onIsp(type: IspTypeLike, purchaseResult?: PurchaseResultLike): HandleOptions;
    static onDialogApiInvoked(name?: string): HandleOptions;
    static onAudioPlayer(type: AudioPlayerTypeLike): HandleOptions;
    static onPlaybackController(type: PlaybackControllerTypeLike): HandleOptions;
    static onCanFulfillIntentRequest(): HandleOptions;
}
