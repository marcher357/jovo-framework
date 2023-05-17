import { CapabilityType, JovoDevice } from '@jovotech/framework';
import { GoogleAssistant } from './GoogleAssistant';
import { Capability as NativeCapability } from './output';
export declare enum GoogleAssistantCapability {
    InteractiveCanvas = "GOOGLE_ASSISTANT:INTERACTIVE_CANVAS",
    WebLink = "GOOGLE_ASSISTANT:WEB_LINK"
}
export type GoogleAssistantCapabilityType = CapabilityType | GoogleAssistantCapability | `${GoogleAssistantCapability}` | NativeCapability | `${NativeCapability}`;
export declare class GoogleAssistantDevice extends JovoDevice<GoogleAssistant, GoogleAssistantCapabilityType> {
}
