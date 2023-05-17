import { ArrayElement, JovoLoggerConfig, UnknownObject } from '@jovotech/common';
import { AppData, ComponentTree, I18NextConfig, IntentMap, Jovo, Middleware, MiddlewareFunction, Plugin, PossibleMiddlewareName } from '.';
import { ComponentConstructor, ComponentDeclaration } from './BaseComponent';
import { Extensible, ExtensibleConfig, ExtensibleInitConfig } from './Extensible';
import { I18Next } from './I18Next';
import { MiddlewareCollection } from './MiddlewareCollection';
import { Platform } from './Platform';
import { BasicLoggingConfig } from './plugins/BasicLogging';
import { Server } from './Server';
export type Usable = Plugin | ComponentConstructor | ComponentDeclaration;
export declare const APP_MIDDLEWARES: readonly ["request.start", "request", "request.end", "interpretation.start", "interpretation.asr", "interpretation.nlu", "interpretation.end", "dialogue.start", "dialogue.router", "dialogue.logic", "dialogue.end", "response.start", "response.output", "response.tts", "response.end"];
export type AppMiddleware = ArrayElement<typeof APP_MIDDLEWARES>;
export type AppMiddlewares = AppMiddleware[];
export type AppErrorListener = (error: Error, jovo?: Jovo) => any;
export interface AppRoutingConfig {
    intentMap?: IntentMap;
    intentsToSkipUnhandled?: string[];
}
export interface AppLoggingConfig extends BasicLoggingConfig {
    logger?: Partial<JovoLoggerConfig>;
}
export interface AppConfig extends ExtensibleConfig {
    i18n?: I18NextConfig;
    logging?: AppLoggingConfig | boolean;
    routing?: AppRoutingConfig;
}
export type AppInitConfig = ExtensibleInitConfig<AppConfig> & {
    components?: Array<ComponentConstructor | ComponentDeclaration>;
};
export declare class App extends Extensible<AppConfig, AppMiddlewares> {
    readonly componentTree: ComponentTree;
    readonly i18n: I18Next;
    private initialized;
    private errorListeners;
    data: AppData;
    cms: UnknownObject;
    constructor(config?: AppInitConfig);
    get isInitialized(): boolean;
    get platforms(): ReadonlyArray<Platform>;
    configure(config: AppInitConfig): void;
    onError(listener: AppErrorListener): void;
    addErrorListener(listener: AppErrorListener): void;
    removeErrorListener(listener: AppErrorListener): void;
    initializeMiddlewareCollection(): MiddlewareCollection<AppMiddlewares>;
    middleware(name: PossibleMiddlewareName<AppMiddleware>): Middleware | undefined;
    middleware(name: string): Middleware | undefined;
    hook(name: PossibleMiddlewareName<AppMiddleware>, fn: MiddlewareFunction): void;
    hook(name: string, fn: MiddlewareFunction): void;
    getDefaultConfig(): AppConfig;
    initialize(): Promise<void>;
    use<T extends Usable[]>(...usables: T): this;
    handle(server: Server): Promise<void>;
    handleError(error: unknown, jovo?: Jovo): Promise<void>;
}
