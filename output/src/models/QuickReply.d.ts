import { EntityMap } from '..';
export type QuickReplyValue = string | QuickReply;
export declare class QuickReply {
    text: string;
    value?: string;
    intent?: string;
    entities?: EntityMap;
}
