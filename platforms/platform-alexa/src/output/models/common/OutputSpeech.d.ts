import { EnumLike } from '@jovotech/framework';
import { MessageValue } from '@jovotech/output';
export declare enum OutputSpeechType {
    Plain = "PlainText",
    Ssml = "SSML"
}
export type OutputSpeechTypeLike = EnumLike<OutputSpeechType>;
export declare enum PlayBehavior {
    Enqueue = "ENQUEUE",
    ReplaceAll = "REPLACE_ALL",
    ReplaceEnqueued = "REPLACE_ENQUEUED"
}
export type PlayBehaviorLike = EnumLike<PlayBehavior>;
export declare class OutputSpeech<TYPE extends OutputSpeechTypeLike = OutputSpeechTypeLike> {
    type: TYPE;
    text?: TYPE extends OutputSpeechType.Plain ? string : TYPE extends OutputSpeechType.Ssml ? undefined : string | undefined;
    ssml?: TYPE extends OutputSpeechType.Ssml ? string : TYPE extends OutputSpeechType.Plain ? undefined : string | undefined;
    playBehavior?: PlayBehaviorLike;
    toMessage?(): MessageValue;
}
