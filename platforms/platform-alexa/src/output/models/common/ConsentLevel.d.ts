import { EnumLike } from '@jovotech/framework';
export declare enum ConsentLevel {
    Account = "ACCOUNT",
    Person = "PERSON"
}
export type ConsentLevelLike = EnumLike<ConsentLevel> | string;
