import { Client, InitConfig } from '@jovotech/client-web';
import { PluginObject } from 'vue';
declare global {
    interface Window {
        JovoWebClientVue?: typeof import('.');
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $client: Client;
    }
}
export interface JovoWebClientVueConfig {
    endpointUrl: string;
    config?: InitConfig;
}
export type PluginConfig = JovoWebClientVueConfig | Client;
export * from '@jovotech/client-web';
declare const plugin: PluginObject<PluginConfig>;
export default plugin;
