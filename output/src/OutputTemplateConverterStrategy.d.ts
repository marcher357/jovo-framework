import { Constructor } from '@jovotech/common';
import { PartialDeep } from 'type-fest';
import { Carousel, DynamicEntities, MessageValue, NormalizedOutputTemplate, OutputTemplate, OutputTemplateBase, OutputTemplatePlatforms, PlainObjectType, QuickReplyValue } from '.';
export interface MessageMaxLengthObject {
    speech?: number;
    text?: number;
}
export type MessageMaxLength = number | MessageMaxLengthObject;
export interface SanitizationConfig {
    trimArrays: boolean;
    trimStrings: boolean;
    trimMaps: boolean;
}
export interface ValidationConfig {
    before: boolean;
    after: boolean;
}
export interface OutputTemplateConverterStrategyConfig {
    [key: string]: unknown;
    omitWarnings: boolean;
    sanitization: SanitizationConfig | boolean;
    validation: ValidationConfig | boolean;
}
export declare abstract class OutputTemplateConverterStrategy<RESPONSE extends Record<string, unknown>, CONFIG extends OutputTemplateConverterStrategyConfig> {
    readonly config: CONFIG;
    abstract readonly platformName: keyof OutputTemplatePlatforms;
    abstract readonly responseClass: Constructor<RESPONSE>;
    constructor(config?: PartialDeep<CONFIG>);
    getDefaultConfig(): CONFIG;
    normalizeOutput(output: OutputTemplate | OutputTemplate[]): NormalizedOutputTemplate | NormalizedOutputTemplate[];
    normalizeResponse(response: PlainObjectType<RESPONSE> | PlainObjectType<RESPONSE>[]): RESPONSE | RESPONSE[];
    abstract toResponse(output: NormalizedOutputTemplate | NormalizedOutputTemplate[]): RESPONSE | RESPONSE[];
    abstract fromResponse(response: RESPONSE | RESPONSE[]): NormalizedOutputTemplate | NormalizedOutputTemplate[];
    protected getRandomizedOutput(output: OutputTemplate): NormalizedOutputTemplate;
    protected getPlatformSpecificOutput(output: OutputTemplate): OutputTemplate;
    protected getOutputValue<KEY extends keyof OutputTemplateBase>(output: OutputTemplate, key: KEY): OutputTemplateBase[KEY];
    protected shouldSanitize(rule?: keyof SanitizationConfig): boolean;
    protected sanitizeMessage(message: MessageValue, path: string, maxLength: MessageMaxLength, offset?: number): MessageValue;
    protected sanitizeDynamicEntities(dynamicEntities: DynamicEntities, path: string, maxEntries: number): DynamicEntities;
    protected sanitizeQuickReplies(quickReplies: QuickReplyValue[], path: string, maxSize: number, maxLength: number): QuickReplyValue[];
    protected sanitizeCarousel(carousel: Carousel, path: string, minSize: number, maxSize: number): Carousel;
    protected logSanitizationWarning(message: string): void;
    protected logStringTrimWarning(path: string, maxLength: number): void;
    protected logArrayTrimWarning(path: string, maxSize: number): void;
    protected logMapTrimWarning(path: string, maxEntries: number): void;
    private getTrimMessage;
}
