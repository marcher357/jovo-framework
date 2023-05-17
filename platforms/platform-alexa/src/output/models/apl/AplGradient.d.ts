import { EnumLike } from '@jovotech/framework';
export declare enum AplGradientType {
    Linear = "linear",
    Radial = "radial"
}
export type AplGradientTypeLike = EnumLike<AplGradientType>;
export declare class AplGradient {
    [key: string]: unknown;
    type?: AplGradientTypeLike;
    angle?: number;
    colorRange: string[];
    description?: string;
    inputRange?: number[];
}
