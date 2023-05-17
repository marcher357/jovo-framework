import { Browser as SupportedBrowser, OperatingSystem } from 'detect-browser';
export type Browser = SupportedBrowser | 'brave';
export interface CustomBrowserInfo {
    readonly type: 'browser';
    readonly name: Browser;
    readonly version: string;
    readonly os: OperatingSystem | null;
}
export declare class BrowserDetector {
    static detect(): CustomBrowserInfo | null;
    static isChrome(): boolean;
    private static detectedData;
}
