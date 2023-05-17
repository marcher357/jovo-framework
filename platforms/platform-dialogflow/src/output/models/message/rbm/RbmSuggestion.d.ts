export declare class RbmSuggestion {
    suggestion: RbmSuggestionContent;
}
export declare class RbmSuggestionContent {
    reply?: RbmSuggestedReply;
    action?: RbmSuggestedAction;
}
export declare class RbmSuggestedReply {
    text: string;
    postback_data: string;
}
export declare class RbmSuggestedAction extends RbmSuggestedReply {
    action: RbmSuggestedActionContent;
}
export declare class RbmSuggestedActionContent {
    dial?: RbmSuggestedActionDial;
    open_url?: RbmSuggestedActionOpenUri;
    share_location?: RbmSuggestedActionShareLocation;
}
export declare class RbmSuggestedActionDial {
    phone_number: string;
}
export declare class RbmSuggestedActionOpenUri {
    uri: string;
}
export declare class RbmSuggestedActionShareLocation {
}
