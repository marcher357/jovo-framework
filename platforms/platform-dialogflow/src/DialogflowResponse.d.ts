import { JovoResponse } from '@jovotech/output';
import { Context, EventInput, Message, SessionEntityType } from './output';
export declare class DialogflowResponse<P extends Record<string, unknown> = Record<string, unknown>> extends JovoResponse {
    fulfillment_text?: string;
    fulfillment_messages?: Message[];
    source?: string;
    payload?: P;
    output_contexts?: Context[];
    followup_event_input?: EventInput;
    end_interaction?: boolean;
    session_entity_types?: SessionEntityType[];
    hasSessionEnded(): boolean;
}
