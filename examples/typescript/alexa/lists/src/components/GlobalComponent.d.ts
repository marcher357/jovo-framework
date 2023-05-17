import { BaseComponent } from '@jovotech/framework';
export declare class GlobalComponent extends BaseComponent {
    LAUNCH(): Promise<void>;
    handleCreatedItems(): void;
    handleUpdatedItems(): Promise<void>;
    handleDeletedItems(): Promise<void>;
}
