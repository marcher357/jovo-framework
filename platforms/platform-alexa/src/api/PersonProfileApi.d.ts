export declare enum PersonProfileProperty {
    NAME = "name",
    GIVEN_NAME = "givenName",
    MOBILE_NUMBER = "mobileNumber"
}
/**
 * Determines the response type for the Person Profile API.
 * For mobileNumber, returns the mobileNumber with the respective countryCode.
 * Otherwise just returns the result string.
 */
export type PersonProfileApiResponse<PROPERTY extends PersonProfileProperty> = PROPERTY extends PersonProfileProperty.MOBILE_NUMBER ? {
    [PersonProfileProperty.MOBILE_NUMBER]: string;
    countryCode: string;
} : string;
/**
 * Sends a request to Amazon's Person Profile API for getting profile information
 * @param profileProperty - The profile property which determines the final API endpoint url
 * @param apiEndpoint - API endpoint, differs on the geographic location of the skill
 * @param permissionToken - Token to authorize the request
 * @see {@link https://developer.amazon.com/en-US/docs/alexa/custom-skills/request-recognized-speaker-contact-information.html Request Recognized Speaker Contact Information}
 */
export declare function sendPersonProfileApiRequest<PROPERTY extends PersonProfileProperty>(profileProperty: PROPERTY, apiEndpoint: string, permissionToken: string): Promise<PersonProfileApiResponse<PROPERTY>>;
