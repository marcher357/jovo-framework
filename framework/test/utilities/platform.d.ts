import { NormalizedOutputTemplate, OutputTemplateConverterStrategy, OutputTemplateConverterStrategyConfig } from '@jovotech/output';
import { AnyObject, CapabilityType, EntityMap, Extensible, ExtensibleConfig, Input, InputTypeLike, Jovo, JovoDevice, JovoInput, JovoRequest, JovoResponse, JovoSession, JovoUser, MiddlewareCollection, Platform, RequestBuilder, UnknownObject } from '../../src';
export declare class ExamplePlatformRequest extends JovoRequest {
    input: Input;
    session?: Partial<JovoSession>;
    getUserId(): string | undefined;
    setUserId(): void;
    getLocale(): string | undefined;
    setLocale(): void;
    getIntent(): JovoInput['intent'];
    setIntent(): void;
    getEntities(): EntityMap | undefined;
    getInputType(): InputTypeLike | undefined;
    getInputText(): JovoInput['text'];
    getInputAudio(): JovoInput['audio'];
    getSessionData(): UnknownObject | undefined;
    setSessionData(): void;
    getSessionId(): string | undefined;
    isNewSession(): boolean | undefined;
    getDeviceCapabilities(): CapabilityType[] | undefined;
}
export declare class ExamplePlatformRequestBuilder extends RequestBuilder<ExamplePlatform> {
    launch(): ExamplePlatformRequest;
    intent(name?: string): ExamplePlatformRequest;
    intent(json?: UnknownObject): ExamplePlatformRequest;
}
export declare class ExamplePlatformResponse extends JovoResponse {
    output: NormalizedOutputTemplate[];
    session?: Partial<JovoSession>;
    error?: unknown;
    hasSessionEnded(): boolean;
}
export declare class ExamplePlatformJovo extends Jovo<ExamplePlatformRequest, ExamplePlatformResponse, ExamplePlatformJovo, ExamplePlatformUser, ExamplePlatformDevice, ExamplePlatform> {
}
export declare class ExamplePlatformOutputConverterStrategy extends OutputTemplateConverterStrategy<ExamplePlatformResponse, OutputTemplateConverterStrategyConfig> {
    platformName: string;
    responseClass: typeof ExamplePlatformResponse;
    fromResponse(response: ExamplePlatformResponse): NormalizedOutputTemplate;
    toResponse(output: NormalizedOutputTemplate | NormalizedOutputTemplate[]): ExamplePlatformResponse;
}
export declare class ExamplePlatformUser extends JovoUser<ExamplePlatformJovo> {
    get id(): string | undefined;
}
export declare class ExamplePlatformDevice extends JovoDevice<ExamplePlatformJovo> {
}
export declare class ExamplePlatform extends Platform<ExamplePlatformRequest, ExamplePlatformResponse, ExamplePlatformJovo, ExamplePlatformUser, ExamplePlatformDevice, ExamplePlatform> {
    readonly id: string;
    readonly outputTemplateConverterStrategy: ExamplePlatformOutputConverterStrategy;
    readonly requestClass: typeof ExamplePlatformRequest;
    readonly jovoClass: typeof ExamplePlatformJovo;
    readonly userClass: typeof ExamplePlatformUser;
    readonly deviceClass: typeof ExamplePlatformDevice;
    readonly requestBuilder: typeof ExamplePlatformRequestBuilder;
    getDefaultConfig(): ExtensibleConfig;
    mount(parent: Extensible): void;
    isRequestRelated(request: AnyObject | ExamplePlatformRequest): boolean;
    isResponseRelated(response: AnyObject | ExamplePlatformResponse): boolean;
    finalizeResponse(response: ExamplePlatformResponse[] | ExamplePlatformResponse, jovo: Jovo<ExamplePlatformRequest, ExamplePlatformResponse>): ExamplePlatformResponse[] | Promise<ExamplePlatformResponse> | Promise<ExamplePlatformResponse[]> | ExamplePlatformResponse;
}
export declare class EmptyPlatform extends ExamplePlatform {
    initializeMiddlewareCollection(): MiddlewareCollection;
}
