import { EnumLike } from '@jovotech/framework';
export declare enum ResolutionPerAuthorityStatusCode {
    SuccessMatch = "ER_SUCCESS_MATCH",
    SuccessNoMatch = "ER_SUCCESS_NO_MATCH",
    ErrorTimeout = "ER_ERROR_TIMEOUT",
    ErrorException = "ER_ERROR_EXCEPTION"
}
export type ResolutionPerAuthorityStatusCodeLike = EnumLike<ResolutionPerAuthorityStatusCode>;
export declare class ResolutionPerAuthorityStatus {
    code: ResolutionPerAuthorityStatusCodeLike;
}
