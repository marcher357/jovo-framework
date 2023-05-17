import { ButtonBase, ButtonType } from './Button';
export declare class GameMetaData {
    player_id?: string;
    context_id?: string;
}
export declare class GamePlayButton extends ButtonBase<ButtonType.GamePlay | 'game_play'> {
    type: ButtonType.GamePlay | 'game_play';
    title: string;
    payload?: string;
    game_metadata?: GameMetaData;
}
