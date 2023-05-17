import type { A, L, S } from 'ts-toolbelt';
import { PartialDeep } from 'type-fest';
export type AnyObject = Record<string, any>;
export type UnknownObject = Record<string, unknown>;
export type ArrayElement<ARRAY_TYPE extends readonly unknown[]> = ARRAY_TYPE[number];
export type DeepPartial<T> = PartialDeep<T>;
export type Constructor<T = AnyObject, ARGS extends unknown[] = any[]> = new (...args: ARGS) => T;
export type PickWhere<T, U> = Pick<T, {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T]>;
export type OmitWhere<T, U> = {
    [K in keyof T as Required<T>[K] extends U ? never : K]: T[K];
};
export type FilterKey<K, I> = A.Equals<K, I> extends 1 ? never : K;
export type OmitIndex<T> = {
    [K in keyof T as FilterKey<K, IndexSignature<T>>]: T[K];
};
export type IndexSignature<T> = {
    [K in keyof T]: K extends infer P ? P : never;
}[keyof T];
export type PartialWhere<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type RequiredOnly<T> = {
    [K in keyof OmitIndex<T> as UnknownObject extends Pick<OmitIndex<T>, K> ? never : K]: OmitIndex<T>[K] extends UnknownObject ? RequiredOnly<OmitIndex<T>[K]> : OmitIndex<T>[K];
};
export type FirstKey<K extends string> = Shift<S.Split<K, '.'>>;
export type Shift<S extends L.List> = S extends readonly [infer P, ...unknown[]] ? P : never;
export type KeyOf<T, K> = K extends keyof T ? K : never;
export type RequiredOnlyWhere<T, K extends string> = L.Length<S.Split<K, '.'>> extends 1 ? PartialDeep<T> & {
    [KEY in keyof T as KEY extends K ? KEY : never]: T[KEY];
} : PartialDeep<T> & {
    [KEY in keyof T as KEY extends FirstKey<K> ? KEY : never]: RequiredOnlyWhere<T[KEY], S.Join<L.Omit<S.Split<K, '.'>, 0>>>;
};
export type EnumLike<T extends string> = T | `${T}`;
export type PlainObjectType<T> = OmitWhere<T, Function>;
export * from './Configurable';
export * from './Input';
export * from './JovoError';
export * from './JovoLogger';
export * from './SsmlUtilities';
