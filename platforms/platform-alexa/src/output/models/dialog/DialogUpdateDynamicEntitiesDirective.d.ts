import { EnumLike } from '@jovotech/framework';
import { SlotType } from '../common/SlotType';
import { Directive } from '../Directive';
export declare enum DynamicEntitiesUpdateBehavior {
    Replace = "REPLACE",
    Clear = "CLEAR"
}
export type DynamicEntitiesUpdateBehaviorLike = EnumLike<DynamicEntitiesUpdateBehavior>;
export declare class DialogUpdateDynamicEntitiesDirective<BEHAVIOR extends DynamicEntitiesUpdateBehaviorLike = DynamicEntitiesUpdateBehaviorLike> extends Directive<'Dialog.UpdateDynamicEntities'> {
    constructor();
    type: 'Dialog.UpdateDynamicEntities';
    updateBehavior: BEHAVIOR;
    types: BEHAVIOR extends DynamicEntitiesUpdateBehavior.Clear ? never : SlotType[];
}
