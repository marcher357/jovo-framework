import { ContentInfo } from '../common/ContentInfo';
export declare enum MediaHeight {
    Unspecified = "HEIGHT_UNSPECIFIED",
    Short = "SHORT",
    Medium = "MEDIUM",
    Tall = "TALL"
}
export declare class Media {
    height: MediaHeight;
    contentInfo: ContentInfo;
}
