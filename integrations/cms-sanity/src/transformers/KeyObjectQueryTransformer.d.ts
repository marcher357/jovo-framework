import { Jovo } from '@jovotech/framework';
import { BaseSanityQueryTransformer, SanityQueryTransformerConfig } from './BaseSanityQueryTransformer';
export interface KeyObjectQueryTransformerConfig extends SanityQueryTransformerConfig {
    key: string;
}
export declare class KeyObjectQueryTransformer extends BaseSanityQueryTransformer<KeyObjectQueryTransformerConfig> {
    private convertArrayToObject;
    getDefaultConfig(): KeyObjectQueryTransformerConfig;
    execute(values: unknown | unknown[], jovo: Jovo): unknown | unknown[];
}
