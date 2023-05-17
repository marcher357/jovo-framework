import { ClientRequest, ClientResponse } from '..';
export declare abstract class NetworkTransportStrategy {
    abstract send(endpointUrl: string, request: ClientRequest): Promise<ClientResponse>;
}
