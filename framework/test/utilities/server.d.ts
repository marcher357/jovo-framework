import { Headers, PlainObjectType, QueryParams, Server } from '../../src';
import { ExamplePlatformRequest, ExamplePlatformResponse } from './platform';
export declare class ExampleServer extends Server {
    readonly request: PlainObjectType<ExamplePlatformRequest>;
    response: PlainObjectType<ExamplePlatformResponse>;
    headers: Headers;
    constructor(request: PlainObjectType<ExamplePlatformRequest>);
    fail(error: Error): Promise<void> | void;
    getNativeRequestHeaders(): Headers;
    getQueryParams(): QueryParams;
    getRequestObject(): PlainObjectType<ExamplePlatformRequest>;
    hasWriteFileAccess(): boolean;
    setResponse(response: PlainObjectType<ExamplePlatformResponse>): Promise<void>;
    setResponseHeaders(headers: Record<string, string>): void;
}
