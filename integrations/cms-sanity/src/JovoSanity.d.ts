import { Jovo } from '@jovotech/framework';
import { SanityCms, SanityCmsConfig } from './SanityCms';
export declare class JovoSanity {
    readonly sanityCms: SanityCms;
    readonly jovo: Jovo;
    readonly client: any;
    constructor(sanityCms: SanityCms, jovo: Jovo);
    get config(): SanityCmsConfig;
    load(queryKeys: string | string[]): Promise<void>;
}
