import { AxiosRequestConfig, AxiosResponse, JovoError, JovoErrorOptions, Method, UnknownObject, Headers } from '@jovotech/framework';
export declare enum AlexaApiErrorCode {
    PARSE_ERROR = "PARSE_ERROR",
    ACCESS_NOT_REQUESTED = "ACCESS_NOT_REQUESTED",
    NO_USER_PERMISSION = "NO_USER_PERMISSION",
    NO_SKILL_PERMISSION = "NO_SKILL_PERMISSION",
    LIST_NOT_FOUND = "LIST_NOT_FOUND",
    ITEM_NOT_FOUND = "ITEM_NOT_FOUND",
    DEVICE_NOT_SUPPORTED = "DEVICE_NOT_SUPPORTED",
    ALERT_NOT_FOUND = "ALERT_NOT_FOUND",
    ERROR = "ERROR"
}
export interface AlexaApiErrorOptions extends JovoErrorOptions {
    code: AlexaApiErrorCode;
}
export declare class AlexaApiError extends JovoError {
    code: AlexaApiErrorCode;
    constructor(options: AlexaApiErrorOptions);
}
export interface AlexaApiOptions extends AxiosRequestConfig {
    endpoint: string;
    path: string;
    permissionToken: string;
    method?: Method;
    headers?: Headers;
    data?: unknown;
    params?: UnknownObject;
}
/**
 * Parses options and sends a request to the specified API endpoint
 * @param options - API options
 */
export declare function sendApiRequest<RESPONSE>(options: AlexaApiOptions): Promise<AxiosResponse<RESPONSE>>;
