import { Scope } from 'nock';
interface AlexaMockSpec {
    response: {
        body: any;
        statusCode: 200 | 403 | 401;
    };
    method: 'GET' | 'POST';
    permissionToken: string;
    path: string;
    endpoint?: string;
    times?: number;
}
export declare function mockAlexaApi(spec: AlexaMockSpec): Scope;
export {};
