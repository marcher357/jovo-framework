import { ExtensibleConfig, Jovo, Platform } from '@jovotech/core';
import {
  CorePlatformOutputTemplateConverterStrategy,
  CorePlatformResponse,
} from '@jovotech/output-core';
import { CorePlatformApp } from './CorePlatformApp';
import { CorePlatformRequest } from './CorePlatformRequest';
import { CorePlatformUser } from './CorePlatformUser';

export interface CorePlatformConfig extends ExtensibleConfig {
  type: 'jovo-platform-core' | string;
}

export class CorePlatform extends Platform<
  CorePlatformRequest,
  CorePlatformResponse,
  CorePlatformConfig
> {
  // TODO: determine how useful this is and if this is required somewhere
  // Creates a class with the given name that only supports requests with the given type.
  // Allows making new platforms on the fly
  static create(
    name: string,
    type: CorePlatformConfig['type'],
  ): new (...args: any[]) => CorePlatform {
    // workaround to make the anonymous' class name equal to `name`
    const obj = {
      [name]: class extends CorePlatform {
        getDefaultConfig(): CorePlatformConfig {
          return {
            ...super.getDefaultConfig(),
            type,
          };
        }
      },
    };
    return obj[name];
  }

  outputTemplateConverterStrategy = new CorePlatformOutputTemplateConverterStrategy();
  requestClass = CorePlatformRequest;
  jovoClass = CorePlatformApp;
  userClass = CorePlatformUser;

  getDefaultConfig(): CorePlatformConfig {
    return {
      type: 'jovo-platform-core',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isRequestRelated(request: Record<string, any> | CorePlatformRequest): boolean {
    return request.version && request.request?.type && request.type === this.config.type;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isResponseRelated(response: Record<string, any> | CorePlatformResponse): boolean {
    return (
      response.version &&
      response.output &&
      response.session &&
      response.context &&
      response.type === this.config.type
    );
  }

  prepareResponse(
    response: CorePlatformResponse,
    jovo: Jovo,
  ): CorePlatformResponse | Promise<CorePlatformResponse> {
    response.type = this.config.type;
    this.setResponseSessionData(response, jovo);
    return response;
  }

  setResponseSessionData(response: CorePlatformResponse, jovo: Jovo): this {
    response.session.data = jovo.$session.$data;
    return this;
  }
}
