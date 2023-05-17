import type { BuildPlatformContext, BuildPlatformEvents } from '@jovotech/cli-command-build';
import { InstallContext } from '@jovotech/cli-core';
import { JovoModelData, JovoModelDataV3 } from '@jovotech/model';
import { AlexaContext } from '../interfaces';
import { AlexaHook } from './AlexaHook';
export interface AlexaBuildPlatformContext extends AlexaContext, BuildPlatformContext {
    flags: BuildPlatformContext['flags'] & {
        'ask-profile'?: string;
    };
}
export declare class BuildHook extends AlexaHook<BuildPlatformEvents> {
    $context: AlexaBuildPlatformContext;
    install(): void;
    /**
     * Add platform-specific CLI options, including flags and args.
     * @param context - Context providing an access point to command flags and args.
     */
    addCliOptions(context: InstallContext): void;
    /**
     * Updates the current plugin context with platform-specific values.
     */
    updatePluginContext(): void;
    /**
     * Checks if the currently selected platform matches this CLI plugin.
     */
    checkForPlatform(): void;
    /**
     * Checks if any provided locale is not supported, thus invalid.
     */
    validateLocales(): void;
    /**
     * Validates Jovo models with platform-specific validators.
     */
    validateModels(): Promise<void>;
    /**
     * Checks if --clean has been set and deletes the platform folder accordingly
     */
    checkForCleanBuild(): void;
    build(): Promise<void>;
    /**
     * Builds Jovo model files from platform-specific files.
     */
    buildReverse(): Promise<void>;
    /**
     * Builds the Alexa skill manifest.
     */
    buildProjectFiles(): void;
    /**
     * Creates and returns tasks for each locale to build the interaction model for Alexa.
     */
    buildInteractionModel(): Promise<string[]>;
    /**
     * Builds and saves an Alexa model from a Jovo model.
     * @param modelLocale - Locale of the Jovo model.
     * @param resolvedLocales - Locales to which to resolve the modelLocale.
     */
    buildLanguageModel(modelLocale: string, resolvedLocales: string[]): Promise<void>;
    buildConversationsFiles(): void;
    buildResponseFiles(): void;
    /**
     * Get plugin-specific endpoint.
     */
    getPluginEndpoint(): string;
    /**
     * Loads a platform-specific model.
     * @param locale - Locale of the model.
     */
    getPlatformModel(locale: string): JovoModelData;
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
