import { Client, InitConfig } from '@jovotech/client-web';
import { Plugin, UnwrapNestedRefs } from 'vue';
declare global {
    interface Window {
        JovoWebClientVue?: typeof import('.');
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $client: UnwrapNestedRefs<Client>;
    }
}
export interface JovoWebClientVueConfig {
    url: string;
    client?: InitConfig;
}
export * from '@jovotech/client-web';
declare const plugin: Plugin;
export default plugin;
