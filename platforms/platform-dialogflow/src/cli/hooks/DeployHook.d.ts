import type { DeployPlatformContext, DeployPlatformEvents } from '@jovotech/cli-command-deploy';
import { InstallContext, PluginHook } from '@jovotech/cli-core';
import { DialogflowCli } from '..';
export interface DialogflowDeployPlatformContext extends DeployPlatformContext {
    flags: DeployPlatformContext['flags'] & {
        'project-id'?: string;
    };
    dialogflow: {
        projectId?: string;
        pathToZip?: string;
    };
}
export declare class DeployHook extends PluginHook<DeployPlatformEvents> {
    $plugin: DialogflowCli;
    $context: DialogflowDeployPlatformContext;
    install(): void;
    /**
     * Add platform-specific CLI options, including flags and args.
     * @param context - Context providing an access point to command flags and args.
     */
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
     * Checks if the platform folder for the current plugin exists.
     */
    checkForPlatformsFolder(): void;
    /**
     * Deploys platform-specific models to the Dialogflow Console.
     */
    deploy(): Promise<void>;
    zipDialogflowFiles(): Promise<void>;
}
