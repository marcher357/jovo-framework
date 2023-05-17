import { DeepPartial } from '@jovotech/common';
import { JovoResponse, OutputTemplate } from '@jovotech/output';
import { JovoRequest } from './index';
import { Jovo } from './Jovo';
import { JovoProxy } from './JovoProxy';
export type OutputConstructor<OUTPUT extends BaseOutput = BaseOutput, REQUEST extends JovoRequest = JovoRequest, RESPONSE extends JovoResponse = JovoResponse, JOVO extends Jovo<REQUEST, RESPONSE> = Jovo<REQUEST, RESPONSE>> = new (jovo: JOVO, options?: DeepPartial<OUTPUT['options']>, ...args: unknown[]) => OUTPUT;
export interface OutputOptions extends OutputTemplate {
}
export declare abstract class BaseOutput<OPTIONS extends OutputOptions = OutputOptions> extends JovoProxy {
    readonly options: OPTIONS;
    constructor(jovo: Jovo, options?: DeepPartial<OPTIONS>);
    getDefaultOptions(): OPTIONS;
    abstract build(): OutputTemplate | OutputTemplate[] | Promise<OutputTemplate | OutputTemplate[]>;
}
