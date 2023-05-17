import { ClientRequest, ClientResponse } from '..';
import { NetworkTransportStrategy } from './NetworkTransportStrategy';
export declare class HttpTransportStrategy extends NetworkTransportStrategy {
    send(endpointUrl: string, request: ClientRequest): Promise<ClientResponse>;
}
