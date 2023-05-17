import { AnyObject, Headers, QueryParams, Server } from '@jovotech/framework';
import type { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import type { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
export declare class Lambda extends Server {
    readonly event: APIGatewayEvent;
    readonly context: Context;
    readonly callback: Callback;
    isApiGateway: boolean;
    headers: APIGatewayProxyEventHeaders;
    requestPayload: AnyObject;
    responseHeaders: Headers;
    constructor(event: APIGatewayEvent, context: Context, callback: Callback);
    fail(error: Error): void;
    getQueryParams(): QueryParams;
    getRequestObject(): AnyObject;
    getNativeRequestHeaders(): Headers;
    hasWriteFileAccess(): boolean;
    setResponse(response: unknown): Promise<void>;
    setResponseHeaders(header: Record<string, string>): void;
}
