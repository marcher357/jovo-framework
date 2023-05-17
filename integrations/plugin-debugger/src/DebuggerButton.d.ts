import { JovoInput } from '@jovotech/framework';
import { PlainObjectType } from './interfaces';
export type DebuggerButtonInput = Omit<PlainObjectType<JovoInput>, 'type'> & Partial<Pick<JovoInput, 'type'>>;
export interface DebuggerButtonBase {
    label: string;
}
export interface InputDebuggerButton extends DebuggerButtonBase {
    input: DebuggerButtonInput | DebuggerButtonInput[];
}
export interface RequestDebuggerButton extends DebuggerButtonBase {
    request: any | any[];
}
export interface SequenceDebuggerButton extends DebuggerButtonBase {
    sequence: Array<DebuggerButtonInput | any>;
}
export type DebuggerButton = InputDebuggerButton | RequestDebuggerButton | SequenceDebuggerButton;
