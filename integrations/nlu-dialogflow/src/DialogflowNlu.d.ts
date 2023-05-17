import { DeepPartial, InterpretationPluginConfig, Jovo, NluData, NluPlugin } from '@jovotech/framework';
import { JWT, JWTInput } from 'google-auth-library';
export interface DialogflowNluConfig extends InterpretationPluginConfig {
    serviceAccount: JWTInput;
    defaultLocale: string;
}
export type DialogflowNluInitConfig = DeepPartial<DialogflowNluConfig> & Pick<DialogflowNluConfig, 'serviceAccount'>;
export declare class DialogflowNlu extends NluPlugin<DialogflowNluConfig> {
    jwtClient?: JWT;
    constructor(config: DialogflowNluInitConfig);
    get projectId(): string | undefined;
    getDefaultConfig(): DialogflowNluConfig;
    processText(jovo: Jovo, text: string): Promise<NluData | undefined>;
    private sendTextToDialogflow;
}
