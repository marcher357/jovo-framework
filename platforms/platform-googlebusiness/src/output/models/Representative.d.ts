export declare enum RepresentativeType {
    Unspecified = "REPRESENTATIVE_TYPE_UNSPECIFIED",
    Bot = "BOT",
    Human = "HUMAN"
}
export type RepresentativeTypeLike = RepresentativeType | `${RepresentativeType}`;
export declare class Representative {
    representativeType: RepresentativeTypeLike;
    displayName?: string;
    avatarImage?: string;
}
