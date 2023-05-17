import { Core } from './Core';
import { CorePlatform, CorePlatformConfig } from './CorePlatform';
declare module '@jovotech/framework/dist/types/Extensible' {
    interface ExtensiblePluginConfig {
        CorePlatform?: CorePlatformConfig;
    }
    interface ExtensiblePlugins {
        CorePlatform?: CorePlatform;
    }
}
declare module '@jovotech/framework/dist/types/Jovo' {
    interface Jovo {
        $core?: Core;
    }
}
export * from './Core';
export * from './CorePlatform';
export * from './CoreRequest';
export * from './CoreResponse';
export * from './CoreUser';
export * from './CoreDevice';
export * from './interfaces';
export * from './output';
