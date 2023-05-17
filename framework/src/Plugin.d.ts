import { Configurable, UnknownObject } from '@jovotech/common';
import { Extensible } from './Extensible';
export interface PluginConfig extends UnknownObject {
    enabled?: boolean;
    skipTests?: boolean;
}
export declare abstract class Plugin<CONFIG extends PluginConfig = PluginConfig> extends Configurable<CONFIG> {
    [key: string]: unknown;
    /**
     * Lifecycle Hook: Called when the plugin is installed via `use`.
     * This hook should be used for installing additional plugins or modifying the App-object in general.
     * Has to be synchronous.
     * @param parent
     */
    install?(parent: Extensible): void;
    /**
     * Lifecycle Hook: Called when the App is initialized and every child plugin is initialized.
     * Can be asynchronous. This hook should be used for time-consuming actions like API-calls.
     * @param parent
     */
    initialize?(parent: Extensible): Promise<void> | void;
    /**
     * Lifecycle Hook: Called when a copy of every plugin is created and mounted onto HandleRequest.
     * This happens on every request and should be used for registering middleware-functions.
     * Can be asynchronous.
     * @param parent
     */
    mount?(parent: Extensible): Promise<void> | void;
    dismount?(parent?: Extensible): Promise<void> | void;
}
