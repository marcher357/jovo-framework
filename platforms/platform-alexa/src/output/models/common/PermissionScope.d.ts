import { EnumLike } from '@jovotech/framework';
export declare enum PermissionScope {
    ReadProfileGivenName = "alexa::profile:given_name:read",
    ReadProfileName = "alexa::profile:name:read",
    ReadProfileMobileNumber = "alexa::profile:mobile_number:read",
    ReadProfileEmail = "alexa::profile:email:read",
    ReadAddressCountryAndPostalCode = "alexa:devices:all:address:country_and_postal_code:read",
    ReadGeolocation = "alexa::devices:all:geolocation:read",
    ReadWriteTimers = "alexa::alerts:timers:skill:readwrite",
    ReadWriteReminders = "alexa::alerts:reminders:skill:readwrite",
    ReadList = "alexa::household:lists:read",
    WriteList = "alexa::household:lists:write",
    ReadAddressFull = "read::alexa:device:all:address"
}
export type PermissionScopeLike = EnumLike<PermissionScope> | string;
export declare enum ConnectionPermissionScope {
    ReadProfileGivenName = "alexa::profile:given_name:read",
    ReadProfileName = "alexa::profile:name:read",
    ReadProfileMobileNumber = "alexa::profile:mobile_number:read",
    ReadProfileEmail = "alexa::profile:email:read",
    ReadAddressCountryAndPostalCode = "alexa:devices:all:address:country_and_postal_code:read",
    ReadGeolocation = "alexa::devices:all:geolocation:read",
    ReadWriteTimers = "alexa::alerts:timers:skill:readwrite",
    ReadWriteReminders = "alexa::alerts:reminders:skill:readwrite"
}
export type ConnectionPermissionScopeLike = EnumLike<ConnectionPermissionScope> | string;
