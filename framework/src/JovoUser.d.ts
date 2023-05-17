import { UserData } from './interfaces';
import { Jovo } from './Jovo';
export type JovoUserConstructor<JOVO extends Jovo> = new (jovo: JOVO) => JOVO['$user'];
export interface PersistableUserData {
    data: UserData;
}
export declare abstract class JovoUser<JOVO extends Jovo = Jovo> {
    readonly jovo: JOVO;
    createdAt: Date;
    updatedAt: Date;
    data: UserData;
    constructor(jovo: JOVO);
    abstract get id(): string | undefined;
    get accessToken(): string | undefined;
    isNew: boolean;
    getPersistableData(): PersistableUserData;
    setPersistableData(data?: PersistableUserData): this;
    toJSON(): JovoUser<JOVO>;
}
