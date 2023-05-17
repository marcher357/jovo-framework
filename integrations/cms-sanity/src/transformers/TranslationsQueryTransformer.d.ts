import { Jovo } from '@jovotech/framework';
import { BaseSanityQueryTransformer, SanityQueryTransformerConfig } from './BaseSanityQueryTransformer';
export interface Resources {
    [key: string]: string | string[] | Resources;
}
interface SanityTranslationEntry {
    platform: string;
    locale: string;
    text: string;
}
interface SanityTranslation {
    key: string;
    defaultEntry: SanityTranslationEntry;
    additionalEntries?: SanityTranslationEntry[];
}
export declare class TranslationsQueryTransformer extends BaseSanityQueryTransformer {
    getDefaultConfig(): SanityQueryTransformerConfig;
    execute(values: SanityTranslation[], jovo: Jovo): Record<string, Resources>;
    private processLocale;
}
export {};
