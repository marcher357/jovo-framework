import { TemplateBase, TemplateType } from './Template';
export declare class ReceiptAddress {
    street_1: string;
    street_2?: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
}
export declare class ReceiptSummary {
    subtotal?: number;
    shipping_cost?: number;
    total_tax?: number;
    total_cost: number;
}
export declare class ReceiptAdjustment {
    name: string;
    amount: number;
}
export declare class ReceiptTemplateElement {
    title: string;
    subtitle?: string;
    quantity?: number;
    price: number;
    currency?: string;
    image_url?: string;
}
export declare class ReceiptTemplate extends TemplateBase<TemplateType.Receipt | 'receipt'> {
    template_type: TemplateType.Receipt | 'receipt';
    sharable?: boolean;
    recipient_name: string;
    merchant_name?: string;
    order_number: string;
    currency: string;
    payment_method: string;
    timestamp?: string;
    elements?: ReceiptTemplateElement[];
    address?: ReceiptAddress;
    summary: ReceiptSummary;
    adjustments?: ReceiptAdjustment[];
}
