import { Extensible, ExtensibleConfig, MiddlewareCollection } from '../../src';
export declare class EmptyExtensible extends Extensible {
    getDefaultConfig(): ExtensibleConfig;
    initializeMiddlewareCollection(): MiddlewareCollection<string[]>;
}
export interface ExampleExtensibleConfig extends ExtensibleConfig {
    text: string;
}
export declare class ExampleExtensible extends Extensible<ExampleExtensibleConfig> {
    getDefaultConfig(): ExampleExtensibleConfig;
    initializeMiddlewareCollection(): MiddlewareCollection<string[]>;
}
export declare class AppLikeExtensible extends Extensible {
    getDefaultConfig(): ExtensibleConfig;
    initializeMiddlewareCollection(): MiddlewareCollection<string[]>;
    mount(): Promise<void> | void;
    initialize(): Promise<void>;
}
