import { EnumLike } from '@jovotech/framework';
export declare enum AplOperationType {
    InsertItem = "InsertItem",
    InsertItems = "InsertMultipleItems",
    SetItem = "SetItem",
    DeleteItem = "DeleteItem",
    DeleteItems = "DeleteMultipleItems"
}
export type AplOperationTypeLike = EnumLike<AplOperationType>;
export declare class AplOperation<TYPE extends AplOperationTypeLike = AplOperationTypeLike> {
    type: TYPE;
    index: number;
}
