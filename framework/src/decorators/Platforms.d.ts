import { OmitIndex } from '@jovotech/common';
import { OutputTemplatePlatforms } from '../index';
export type RegisteredPlatformName = Exclude<keyof OmitIndex<OutputTemplatePlatforms>, number>;
export declare function Platforms(platforms: Array<string | RegisteredPlatformName>): MethodDecorator;
export declare function Platforms(...platforms: Array<string | RegisteredPlatformName>): MethodDecorator;
