import type { BuildPlatformContext, BuildPlatformEvents } from '@jovotech/cli-command-build';
import { PluginHook } from '@jovotech/cli-core';
import { JovoModelData, JovoModelDataV3, NativeFileInformation } from '@jovotech/model';
import { DialogflowCli } from '..';
export interface DialogflowBuildContext extends BuildPlatformContext {
    dialogflow: {
        endpoint?: string;
        language?: string;
        supportedLanguages?: string[];
    };
}
export declare class BuildHook extends PluginHook<BuildPlatformEvents> {
    $plugin: DialogflowCli;
    $context: DialogflowBuildContext;
    install(): void;
    /**
     * Checks if the currently selected platform matches this CLI plugin.
     * @param context - Context containing information after flags and args have been parsed by the CLI.
     */
    checkForPlatform(): void;
    /**
     * Checks, if --clean has been set and deletes the platform folder accordingly.
     */
    checkForCleanBuild(): void;
    /**
     * Checks if any provided locale is not supported, thus invalid.
     */
    validateLocales(): void;
    /**
     * Validates Jovo models with platform-specific validators.
     */
    validateModels(): Promise<void>;
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext(): void;
    buildDialogflowAgent(): Promise<void>;
    createDialogflowProjectFiles(): void;
    /**
     * Creates and returns tasks for each locale to build the interaction model for Dialogflow.
     */
    createInteractionModel(): Promise<void>;
    /**
     * Builds and saves an Alexa model from a Jovo model.
     * @param modelLocale - Locale of the Jovo model.
     * @param resolvedLocales - Locales to which to resolve the modelLocale.
     */
    buildLanguageModel(modelLocale: string, resolvedLocales: string[]): Promise<void>;
    buildReverse(): Promise<void>;
    getPlatformFiles(locale: string): NativeFileInformation[];
    /**
     * Returns all locales for the current platform.
     */
    getPlatformLocales(): string[];
    /**
     * Loads a Jovo model specified by a locale and merges it with plugin-specific models.
     * @param locale - The locale that specifies which model to load.
     */
    getJovoModel(locale: string): Promise<JovoModelData | JovoModelDataV3>;
}
