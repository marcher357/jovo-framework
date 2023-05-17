import { FacebookMessenger } from './FacebookMessenger';
import { FacebookMessengerConfig, FacebookMessengerPlatform } from './FacebookMessengerPlatform';
declare module '@jovotech/framework/dist/types/Extensible' {
    interface ExtensiblePluginConfig {
        FacebookMessengerPlatform?: FacebookMessengerConfig;
    }
    interface ExtensiblePlugins {
        FacebookMessengerPlatform?: FacebookMessengerPlatform;
    }
}
declare module '@jovotech/framework/dist/types/Jovo' {
    interface Jovo {
        $facebookMessenger?: FacebookMessenger;
    }
}
export * from './FacebookMessenger';
export * from './FacebookMessengerDevice';
export * from './FacebookMessengerPlatform';
export * from './FacebookMessengerRequest';
export * from './FacebookMessengerResponse';
export * from './FacebookMessengerUser';
export * from './interfaces';
export * from './constants';
export * from './output';
