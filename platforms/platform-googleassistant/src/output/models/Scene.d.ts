import { EnumLike } from '@jovotech/framework';
export declare class NextScene {
    name: string;
}
export declare enum SlotFillingStatus {
    Unspecified = "UNSPECIFIED",
    Initialized = "INITIALIZED",
    Collecting = "COLLECTING",
    Final = "FINAL"
}
export type SlotFillingStatusLike = EnumLike<SlotFillingStatus>;
export declare class Scene {
    name: string;
    slotFillingStatus?: SlotFillingStatusLike;
    slots: Record<string, unknown>;
    next?: NextScene;
}
