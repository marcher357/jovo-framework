import { EnumLike } from '@jovotech/framework';
export declare enum HtmlTransformer {
    SsmlToSpeech = "ssmlToSpeech",
    TextToSpeech = "textToSpeech"
}
export type HtmlTransformerLike = EnumLike<HtmlTransformer>;
export declare class HtmlTransformers {
    inputPath: string;
    outputName?: string;
    transformer: HtmlTransformerLike;
}
