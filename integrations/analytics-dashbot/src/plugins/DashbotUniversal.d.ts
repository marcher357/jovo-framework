import { Jovo, JovoRequest, JovoResponse, UnknownObject } from '@jovotech/framework';
import { DashbotAnalyticsPlugin } from './DashbotAnalyticsPlugin';
export interface DashbotUniversalInput {
    name: string;
    value: string;
}
export interface DashbotUniversalIntent {
    name: string;
    inputs: DashbotUniversalInput[];
}
export interface DashbotUniversalImage {
    url: string;
}
export interface DashbotUniversalButton {
    id?: string;
    label?: string;
    value?: string;
}
export interface DashbotUniversalPostback {
    buttonClick: {
        buttonId: string;
    };
}
export interface DashbotUniversalLog extends UnknownObject {
    text: string;
    userId: string;
    intent?: DashbotUniversalIntent;
    images?: DashbotUniversalImage[];
    buttons?: DashbotUniversalButton[];
    postback?: DashbotUniversalPostback;
    platformJson?: JovoRequest | JovoResponse;
    sessionId?: string;
}
export declare class DashbotUniversal extends DashbotAnalyticsPlugin {
    readonly id: string;
    trackRequest(jovo: Jovo, url: string): Promise<void>;
    trackResponse(jovo: Jovo, url: string): Promise<void>;
    canHandle(): boolean;
    private getButtons;
    private getOutputText;
    private getRandomElement;
}
