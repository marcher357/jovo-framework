import type { NewContext, NewEvents } from '@jovotech/cli-command-new';
import { PluginHook } from '@jovotech/cli-core';
import { DialogflowCli } from '..';
export declare class NewHook extends PluginHook<NewEvents> {
    $plugin: DialogflowCli;
    $context: NewContext;
    install(): void;
    setDefaultConfig(): Promise<void>;
}
