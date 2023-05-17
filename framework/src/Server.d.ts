import { AnyObject } from '@jovotech/common';
export interface Headers {
    [header: string]: string | string[] | undefined;
}
export interface QueryParams {
    [header: string]: string | string[] | undefined;
}
export type ServerResponseType = string | number | AnyObject;
export type ServerResponse = ServerResponseType | ServerResponseType[];
export declare abstract class Server {
    /**
       Returns whether the host can write files.
       **/
    abstract hasWriteFileAccess(): boolean;
    /**
       Returns request object
       **/
    abstract getRequestObject(): AnyObject;
    /**
       Returns query params
       **/
    abstract getQueryParams(): QueryParams;
    /**
       Sets additional response headers. Will be merged with existing
       **/
    abstract setResponseHeaders(header: Record<string, string>): void;
    /**
       Sets response object
       **/
    abstract setResponse(response: ServerResponse): Promise<void>;
    /**
       Calls fail method of server
       **/
    abstract fail(error: Error): Promise<void> | void;
    /**
     Returns request headers
     **/
    abstract getNativeRequestHeaders(): Headers;
    /**
     * Converts native header keys to lowercase
     *
     * Example:
     * headers = {
     *    Host: 'localhost:3000',
     *    Authorization: 'Bearer TOKEN',
     * }
     * Converts to:
     * headers = {
     *    host: 'localhost:3000',
     *    authorization: 'Bearer TOKEN',
     * }
     *
     */
    getRequestHeaders(): Headers;
}
