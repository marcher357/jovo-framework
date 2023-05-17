import { DialAction } from './DialAction';
import { OpenUrlAction } from './OpenUrlAction';
import { SuggestedReply } from './SuggestedReply';
export declare class SuggestedAction extends SuggestedReply {
    openUrlAction?: OpenUrlAction;
    dialAction?: DialAction;
}
