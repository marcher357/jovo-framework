import { AskSkillList } from '../interfaces';
export declare function listSkills(askProfile?: string): Promise<AskSkillList>;
export declare function getSkillStatus(skillId: string, askProfile?: string): Promise<void>;
