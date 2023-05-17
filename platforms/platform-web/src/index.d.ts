import { Core, CorePlatform, CorePlatformConfig, NormalizedCoreOutputTemplate } from '@jovotech/platform-core';
declare module '@jovotech/framework/dist/types/Extensible' {
    interface ExtensiblePluginConfig {
        WebPlatform?: CorePlatformConfig<'web'>;
    }
    interface ExtensiblePlugins {
        WebPlatform?: CorePlatform<'web'>;
    }
}
declare module '@jovotech/framework/dist/types/Jovo' {
    interface Jovo {
        $web?: Core;
    }
}
declare module '@jovotech/framework/dist/types/index' {
    interface NormalizedOutputTemplatePlatforms {
        web?: NormalizedCoreOutputTemplate;
    }
}
export declare const WebPlatform: new (config?: import("@jovotech/framework/dist/types/Extensible").ExtensibleInitConfig<CorePlatformConfig<"web">, never> | undefined) => CorePlatform<"web">;
export * from '@jovotech/platform-core';
