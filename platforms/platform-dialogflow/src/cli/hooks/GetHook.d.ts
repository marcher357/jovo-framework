import type { GetPlatformContext, GetPlatformEvents } from '@jovotech/cli-command-get';
import { InstallContext, PluginHook } from '@jovotech/cli-core';
import { DialogflowCli } from '..';
export interface DialogflowGetContext extends GetPlatformContext {
    flags: GetPlatformContext['flags'] & {
        'project-id'?: string;
    };
    dialogflow: {
        projectId?: string;
    };
}
export declare class GetHook extends PluginHook<GetPlatformEvents> {
    $plugin: DialogflowCli;
    $context: DialogflowGetContext;
    install(): void;
    addCliOptions(context: InstallContext): void;
    /**
     * Checks if the currently selected platform matches this CLI plugin.
     * @param context - Context containing information after flags and args have been parsed by the CLI.
     */
    checkForPlatform(): void;
    checkForGcloudCli(): Promise<void>;
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext(): void;
    /**
     * Checks if platform-specific files already exist and prompts for overwriting them.
     */
    checkForExistingPlatformFiles(): Promise<void>;
    /**
     * Fetches platform-specific models from the Dialogflow Console.
     */
    get(): Promise<void>;
}
