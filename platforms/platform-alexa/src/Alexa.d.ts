import { App, EntityMap, HandleRequest, Jovo } from '@jovotech/framework';
import { AlexaDevice } from './AlexaDevice';
import { AlexaPlatform } from './AlexaPlatform';
import { AlexaRequest } from './AlexaRequest';
import { AlexaResponse } from './AlexaResponse';
import { AlexaUser } from './AlexaUser';
import { AlexaEntity } from './interfaces';
import { AlexaIsp } from './AlexaIsp';
import { AlexaAudioPlayer } from './AlexaAudioPlayer';
export declare class Alexa extends Jovo<AlexaRequest, AlexaResponse, Alexa, AlexaUser, AlexaDevice, AlexaPlatform> {
    $entities: EntityMap<AlexaEntity>;
    isp: AlexaIsp;
    audioPlayer: AlexaAudioPlayer;
    constructor($app: App, $handleRequest: HandleRequest, $platform: AlexaPlatform);
    getSkillId(): string | undefined;
}
