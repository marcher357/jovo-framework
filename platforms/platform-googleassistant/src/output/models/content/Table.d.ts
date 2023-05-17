import { EnumLike } from '@jovotech/framework';
import { Image } from '../common/Image';
import { Link } from '../common/Link';
export declare class Table {
    title?: string;
    subtitle?: string;
    image?: Image;
    columns: TableColumn[];
    rows: TableRow[];
    button?: Link;
}
export declare enum HorizontalAlignment {
    Unspecified = "UNSPECIFIED",
    Leading = "LEADING",
    Center = "CENTER",
    Trailing = "TRAILING"
}
export type HorizontalAlignmentLike = EnumLike<HorizontalAlignment>;
export declare class TableColumn {
    header: string;
    align?: HorizontalAlignmentLike;
}
export declare class TableRow {
    cells: TableCell[];
    divider: boolean;
}
export declare class TableCell {
    text: string;
}
