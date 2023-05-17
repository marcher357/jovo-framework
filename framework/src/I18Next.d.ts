import { AnyObject, OmitIndex } from '@jovotech/common';
import { InitOptions, Resource, TFunctionResult, TOptionsBase } from 'i18next';
import type { A, F, O, S, U } from 'ts-toolbelt';
import { Plugin, PluginConfig } from './Plugin';
export type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;
export interface I18NextResources extends Resource {
}
export type NonIndexedI18NextResources = OmitIndex<I18NextResources>;
export type TransformI18NextKeys<KEYS> = Exclude<KEYS, number> extends never ? string : Exclude<KEYS, number>;
export type I18NextResourcesLanguageKeys = TransformI18NextKeys<keyof NonIndexedI18NextResources>;
export type I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE extends I18NextResourcesLanguageKeys | string> = keyof U.Merge<I18NextResources[LANGUAGE]>;
export type I18NextAutoPath<PATH extends string, LANGUAGE extends I18NextResourcesLanguageKeys | string, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string, MERGED = U.Merge<I18NextResources[LANGUAGE]>> = F.AutoPath<MERGED[A.Cast<NAMESPACE, keyof MERGED>], PATH>;
export type I18NextFullPath<PATH extends string, LANGUAGE extends I18NextResourcesLanguageKeys | string, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string> = S.Join<[LANGUAGE, A.Cast<NAMESPACE, string>, PATH], '.'>;
export type I18NextValueAt<PATH extends string, LANGUAGE extends I18NextResourcesLanguageKeys | string, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string, RESULT = O.Path<NonIndexedI18NextResources, S.Split<I18NextFullPath<PATH, LANGUAGE, NAMESPACE>, '.'>>> = RESULT extends undefined ? string : RESULT;
export interface I18NextConfig extends InitOptions, PluginConfig {
}
export type I18NextTFunctionResult = TFunctionResult;
export type I18NextTFunctionOptions = TOptionsBase & {
    platform?: string;
};
export interface I18NextTOptions<LANGUAGE extends I18NextResourcesLanguageKeys | string, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string = I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE>> extends TOptionsBase, AnyObject {
    lng?: LANGUAGE;
    ns?: A.Cast<NAMESPACE | I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | Array<NAMESPACE | I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE>>, string | string[]>;
    platform?: string;
}
export declare class I18Next extends Plugin<I18NextConfig> {
    readonly i18n: import("i18next").i18n;
    getDefaultConfig(): I18NextConfig;
    initialize(): Promise<void>;
    t<PATH extends string, LANGUAGE extends I18NextResourcesLanguageKeys | string = I18NextResourcesLanguageKeys, NAMESPACE extends I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE> | string = I18NextResourcesNamespaceKeysOfLanguage<LANGUAGE>>(path: I18NextAutoPath<PATH, LANGUAGE, NAMESPACE> | PATH | Array<I18NextAutoPath<PATH, LANGUAGE, NAMESPACE> | PATH>, options?: I18NextTOptions<LANGUAGE, NAMESPACE>): I18NextValueAt<PATH, LANGUAGE, NAMESPACE>;
    t<FORCED_RESULT>(path: string | string[], options?: I18NextTFunctionOptions): FORCED_RESULT;
}
