import { EnumLike } from '@jovotech/framework';
import { Card } from './message/Card';
import { Image } from './message/Image';
import { QuickReplies } from './message/QuickReplies';
import { RbmCarouselCard } from './message/rbm/RbmCarouselCard';
import { RbmStandaloneCard } from './message/rbm/RbmStandaloneCard';
import { RbmText } from './message/rbm/RbmText';
import { TelephonyPlayAudio } from './message/telephony/TelephonyPlayAudio';
import { TelephonySynthesizeSpeech } from './message/telephony/TelephonySynthesizeSpeech';
import { TelephonyTransferCall } from './message/telephony/TelephonyTransferCall';
import { Text } from './message/Text';
export declare enum Platform {
    Unspecified = "PLATFORM_UNSPECIFIED",
    Facebook = "FACEBOOK",
    Slack = "SLACK",
    Telegram = "TELEGRAM",
    Kik = "KIK",
    Skype = "SKYPE",
    Line = "LINE",
    Viber = "VIBER",
    ActionsOnGoogle = "ACTIONS_ON_GOOGLE",
    Telephony = "TELEPHONY",
    GoogleHangouts = "GOOGLE_HANGOUTS"
}
export type PlatformLike = EnumLike<Platform>;
export declare class Message {
    platform?: PlatformLike;
    message: MessageContent;
}
export declare class MessageContent<P extends Record<string, unknown> = Record<string, unknown>> {
    text?: Text;
    image?: Image;
    quick_replies?: QuickReplies;
    card?: Card;
    payload?: P;
    simple_responses?: Record<string, unknown>;
    basic_card?: Record<string, unknown>;
    suggestions?: Record<string, unknown>;
    link_out_suggestion?: Record<string, unknown>;
    list_select?: Record<string, unknown>;
    carousel_select?: Record<string, unknown>;
    telephony_play_audio?: TelephonyPlayAudio;
    telephony_synthesize_speech?: TelephonySynthesizeSpeech;
    telephony_transfer_call?: TelephonyTransferCall;
    rbm_text?: RbmText;
    rbm_standalone_rich_card?: RbmStandaloneCard;
    rbm_carousel_rich_card?: RbmCarouselCard;
    browse_carousel_card?: Record<string, unknown>;
    table_card?: Record<string, unknown>;
    media_content?: Record<string, unknown>;
}
