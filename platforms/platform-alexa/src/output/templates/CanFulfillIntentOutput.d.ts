import { BaseOutput, OutputOptions, OutputTemplate } from '@jovotech/framework';
export type CanFulfillResponse = 'YES' | 'NO' | 'MAYBE';
export interface CanFulfillIntentOutputSlotOptions {
    canUnderstand?: CanFulfillResponse;
    canFulfill?: CanFulfillResponse;
}
export interface CanFulfillIntentOutputOptions extends OutputOptions {
    canFulfill: CanFulfillResponse;
    slots?: Record<string, CanFulfillIntentOutputSlotOptions>;
}
export declare class CanFulfillIntentOutput extends BaseOutput<CanFulfillIntentOutputOptions> {
    build(): OutputTemplate;
}
