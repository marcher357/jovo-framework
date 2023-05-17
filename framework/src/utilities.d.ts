import { AnyObject } from '@jovotech/common';
export declare function forEachDeep<T = any>(value: T, handler: (val: T[keyof T] | any, path: string) => void, path?: string): void;
export declare function getMethodKeys<PROTOTYPE = any>(prototype: PROTOTYPE): Array<keyof PROTOTYPE>;
/**
 * Allows to mask certain properties of an object to hide sensitive data.
 * Alters the original object.
 * @param obj - Object which contains properties to mask
 * @param objectsToMask - Array of strings representing the properties to mask. Nested properties are supported, e.g. "foo.bar".
 * @param mask - Mask value to apply. If a function is provided, it will be executed and the result will be taken as the mask value.
 */
export declare function mask(obj: AnyObject, objectsToMask: string[], mask: unknown): void;
/**
 * Copies an object and allows to suggest properties to include/exclude
 * @param source - Source object to copy
 * @param config - Copy configuration, allows to set properties to include/exclude when copying. Nested properties are supported, e.g. "foo.bar".
 */
export declare function copy<T extends AnyObject>(source?: AnyObject, config?: {
    include?: string[];
    exclude?: string[];
}): T;
