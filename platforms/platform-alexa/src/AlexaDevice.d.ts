import { CapabilityType, JovoDevice } from '@jovotech/framework';
import { Alexa } from './Alexa';
import { DeviceLocation, DeviceAddressLocation } from './api/DeviceLocationApi';
export declare enum AlexaCapability {
    Apl = "ALEXA:APL"
}
export type AlexaCapabilityType = CapabilityType | AlexaCapability | `${AlexaCapability}`;
export declare class AlexaDevice extends JovoDevice<Alexa, AlexaCapabilityType> {
    get id(): string | undefined;
    getLocation(): Promise<DeviceLocation>;
    getAddress(): Promise<DeviceAddressLocation>;
    getTimeZone(): Promise<string>;
}
