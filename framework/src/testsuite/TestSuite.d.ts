import { Constructor, Input, OmitWhere } from '@jovotech/common';
import { OutputTemplate } from '@jovotech/output';
import { PartialDeep } from 'type-fest';
import { App, Jovo, Platform, Plugin, PluginConfig } from '..';
import { JovoInput } from '../JovoInput';
import { TestPlatform } from './TestPlatform';
/**
 * Infers generic types of the provided platform
 */
export type PlatformTypes<PLATFORM extends Platform> = PLATFORM extends Platform<infer REQUEST, infer RESPONSE, infer JOVO, infer USER, infer DEVICE> ? {
    request: REQUEST;
    response: RESPONSE;
    jovo: JOVO;
    user: USER;
    device: DEVICE;
} : never;
/**
 * Determines whether the provided response type is of type array or not
 */
export type PlatformResponseType<PLATFORM extends Platform> = ReturnType<PLATFORM['outputTemplateConverterStrategy']['toResponse']>;
/**
 * Return type of TestSuite.prototype.run().
 * Returns output, which can be of type array or object, and
 * response, whose type is determined based upon the OutputTemplateConverterStrategy.
 */
export type TestSuiteResponse<PLATFORM extends Platform> = {
    output: OutputTemplate[];
    response: PlatformResponseType<PLATFORM>;
};
export type RequestOrInput<PLATFORM extends Platform> = JovoInput | PlatformTypes<PLATFORM>['request'];
export type JovoRequestObject<PLATFORM extends Platform> = OmitWhere<PlatformTypes<PLATFORM>['request'], Function>;
export type JovoRequestLike<PLATFORM extends Platform> = PlatformTypes<PLATFORM>['request'] | PlatformTypes<PLATFORM>['request'][] | JovoRequestObject<PLATFORM> | JovoRequestObject<PLATFORM>[];
export type JovoInputLike = JovoInput | JovoInput[] | Input | Input[];
export type RequestOrInputLike<PLATFORM extends Platform> = JovoRequestLike<PLATFORM> | JovoInputLike;
export interface TestSuiteConfig<PLATFORM extends Platform> extends PluginConfig {
    userId: string;
    platform: Constructor<PLATFORM>;
    locale: string;
    data: {
        deleteAfterAll: boolean;
        deleteAfterEach: boolean;
    };
    stage: string;
    app?: App;
}
export type PartialTestSuiteConfig<PLATFORM extends Platform> = PartialDeep<TestSuiteConfig<PLATFORM>> & Partial<Pick<TestSuiteConfig<PLATFORM>, 'platform'>>;
export interface TestSuite<PLATFORM extends Platform> extends Jovo, Plugin<TestSuiteConfig<PLATFORM>> {
}
export declare class TestSuite<PLATFORM extends Platform = TestPlatform> extends Plugin<TestSuiteConfig<PLATFORM>> {
    private requestOrInput;
    private app;
    private requestBuilder;
    $request: PlatformTypes<PLATFORM>['request'];
    $response: TestSuiteResponse<PLATFORM>['response'];
    $device: PlatformTypes<PLATFORM>['device'];
    $user: PlatformTypes<PLATFORM>['user'];
    $platform: PLATFORM;
    $output: OutputTemplate[];
    constructor(config?: PartialTestSuiteConfig<PLATFORM>);
    getDefaultConfig(): TestSuiteConfig<PLATFORM>;
    install(app: App): void;
    run(input: JovoInputLike): Promise<TestSuiteResponse<PLATFORM>>;
    run(request: JovoRequestLike<PLATFORM>): Promise<TestSuiteResponse<PLATFORM>>;
    clearData(): void;
    private prepareRequest;
    private postProcess;
    private loadApp;
    private isRequest;
}
