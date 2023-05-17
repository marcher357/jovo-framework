import { Alexa } from './Alexa';
import { AlexaConfig, AlexaPlatform } from './AlexaPlatform';
import type { AlexaCli as AlexaCliType } from './cli';
declare module '@jovotech/framework/dist/types/Extensible' {
    interface ExtensiblePluginConfig {
        AlexaPlatform?: AlexaConfig;
    }
    interface ExtensiblePlugins {
        AlexaPlatform?: AlexaPlatform;
    }
}
declare module '@jovotech/framework/dist/types/Jovo' {
    interface Jovo {
        $alexa?: Alexa;
    }
}
export declare const AlexaCli: typeof AlexaCliType;
export * from './Alexa';
export * from './AlexaPlatform';
export * from './AlexaRequest';
export * from './AlexaResponse';
export * from './AlexaRequestBuilder';
export * from './AlexaUser';
export * from './AlexaHandles';
export * from './AlexaDevice';
export * from './api';
export * from './api/ReminderApi';
export * from './api/ListApi';
export * from './constants';
export * from './interfaces';
export * from './output';
