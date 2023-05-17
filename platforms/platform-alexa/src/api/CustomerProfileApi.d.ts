export declare enum ProfileProperty {
    NAME = "name",
    GIVEN_NAME = "givenName",
    EMAIL = "email",
    MOBILE_NUMBER = "mobileNumber"
}
/**
 * Determines the response type for the Customer Profile API.
 * For mobileNumber, returns the mobileNumber with the respective countryCode.
 * Otherwise just returns the result string.
 */
export type CustomerProfileApiResponse<PROPERTY extends ProfileProperty> = PROPERTY extends ProfileProperty.MOBILE_NUMBER ? {
    [ProfileProperty.MOBILE_NUMBER]: string;
    countryCode: string;
} : string;
/**
 * Sends a request to Amazon's Customer Profile API for getting profile information
 * @param profileProperty - The profile property which determines the final API endpoint url
 * @param apiEndpoint - API endpoint, differs on the geographic location of the skill
 * @param permissionToken - Token to authorize the request
 */
export declare function sendCustomerProfileApiRequest<PROPERTY extends ProfileProperty>(profileProperty: PROPERTY, apiEndpoint: string, permissionToken: string): Promise<CustomerProfileApiResponse<PROPERTY>>;
