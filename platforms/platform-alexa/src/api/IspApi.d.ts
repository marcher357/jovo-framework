import { UnknownObject } from '@jovotech/framework';
export type InSkillProductType = 'CONSUMABLE' | 'SUBSCRIPTION' | 'ENTITLEMENT';
export type EntitledType = 'ENTITLED' | 'NOT_ENTITLED';
export type EntitledReasonType = 'PURCHASED' | 'NOT_PURCHASED' | 'AUTO_ENTITLED';
export type PurchasableType = 'PURCHASABLE' | 'NOT_PURCHASABLE';
export type PurchaseModeType = 'LIVE' | 'TEST';
export interface InSkillProduct {
    productId: string;
    referenceName: string;
    type: InSkillProductType;
    name: string;
    summary: string;
    entitled: EntitledType;
    entitlementReason: EntitledReasonType;
    purchasable: PurchasableType;
    activeEntitlementCount: number;
    purchaseMode: PurchaseModeType;
}
export interface ProductListResponse {
    inSkillProducts: InSkillProduct[];
    nextToken: null | string;
    truncated: boolean;
}
export interface InSkillProductsParams extends UnknownObject {
    purchasable?: PurchasableType;
    entitled?: EntitledType;
    productType?: InSkillProductType;
    nextToken?: string;
    maxResults?: number;
}
export declare function getProductList(apiEndpoint: string, permissionToken: string, language: string, params?: InSkillProductsParams): Promise<ProductListResponse>;
