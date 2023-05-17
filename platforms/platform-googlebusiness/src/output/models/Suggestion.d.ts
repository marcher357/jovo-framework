import { QuickReplyValue } from '@jovotech/output';
import { AuthenticationRequest } from './suggestion/AuthenticationRequest';
import { LiveAgentRequest } from './suggestion/LiveAgentRequest';
import { SuggestedAction } from './suggestion/SuggestedAction';
import { SuggestedReply } from './suggestion/SuggestedReply';
export declare class Suggestion {
    reply?: SuggestedReply;
    action?: SuggestedAction;
    liveAgentRequest?: LiveAgentRequest;
    authenticationRequest?: AuthenticationRequest;
    toQuickReply?(): QuickReplyValue;
}
