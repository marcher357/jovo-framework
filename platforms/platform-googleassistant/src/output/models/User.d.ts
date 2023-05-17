import { EnumLike } from '@jovotech/framework';
export declare enum AccountLinkingStatus {
    Unspecified = "ACCOUNT_LINKING_STATUS_UNSPECIFIED",
    NotLinked = "NOT_LINKED",
    Linked = "LINKED"
}
export type AccountLinkingStatusLike = EnumLike<AccountLinkingStatus>;
export declare enum UserVerificationStatus {
    Unspecified = "USER_VERIFICATION_STATUS_UNSPECIFIED",
    Guest = "GUEST",
    Verified = "VERIFIED"
}
export type UserVerificationStatusLike = EnumLike<UserVerificationStatus>;
export declare class IntentSubscription {
    intent: string;
    contentTitle: string;
}
export declare class Engagement {
    pushNotificationIntents: IntentSubscription[];
    dailyUpdateIntents: IntentSubscription[];
}
export declare enum SkuType {
    Unspecified = "SKU_TYPE_UNSPECIFIED",
    InApp = "IN_APP",
    Subscription = "SUBSCRIPTION",
    App = "APP"
}
export type SkuTypeLike = EnumLike<SkuType>;
export declare class SignedData {
    inAppPurchaseData: Record<string, unknown>;
    inAppDataSignature: string;
}
export declare class Entitlement {
    sku: string;
    skuType: SkuTypeLike;
    inAppDetails: SignedData;
}
export declare class PackageEntitlements {
    packageName: string;
    entitlements: Entitlement[];
}
export declare class User {
    locale: string;
    params?: Record<string, unknown>;
    accountLinkingStatus: AccountLinkingStatusLike;
    verificationStatus: UserVerificationStatusLike;
    lastSeenTime: string;
    engagement: Engagement;
    packageEntitlements: PackageEntitlements[];
}
