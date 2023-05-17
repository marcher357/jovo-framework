import { NormalizedOutputTemplate } from '@jovotech/output';
import { Client } from '../Client';
export declare class OutputProcessor {
    readonly client: Client;
    constructor(client: Client);
    processSequence(sequence: NormalizedOutputTemplate[]): Promise<void>;
    processTemplate(output: NormalizedOutputTemplate): Promise<void>;
}
