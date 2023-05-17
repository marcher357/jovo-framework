import { Jovo } from './Jovo';
export declare enum Capability {
    Screen = "SCREEN",
    Audio = "AUDIO",
    LongformAudio = "LONGFORM_AUDIO",
    Video = "VIDEO"
}
export type CapabilityType = Capability | `${Capability}` | string;
export type JovoDeviceConstructor<JOVO extends Jovo> = new (jovo: JOVO) => JOVO['$device'];
export declare abstract class JovoDevice<JOVO extends Jovo = Jovo, CAPABILITY extends CapabilityType = CapabilityType> {
    readonly jovo: JOVO;
    capabilities: CAPABILITY[];
    constructor(jovo: JOVO);
    supports(capability: CAPABILITY): boolean;
    toJSON(): JovoDevice<JOVO>;
}
