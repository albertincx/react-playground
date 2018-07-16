import {PlaygroundState} from "Playground/interfaces/playground";
import {PlaygroundAction} from "../types/actions";

import config from "Playground/config";

const defaultSettings = {
    width: config.MIN_WIDTH,
    height: config.MIN_HEIGHT,
    speed: config.MIN_SPEED,
    cellBox: config.CELL_BOX,
    hash: ''
};
const defaultState: PlaygroundState = {
    setting: defaultSettings,
    key: '',
    isGameStarted: false,
    isGameOver: false
};

export default function playground(state: PlaygroundState = defaultState, action: PlaygroundAction): PlaygroundState {
    switch (action.type) {

        case 'GAME_SELECTED': {
            state.currentGame = action.currentGame;
            return {
                ...state
            };
        }
        case 'RESTART_GAME':
            state.setting.hash = Math.random();
            state.isGameStarted = true;
            state.isGameOver = false;
            return {
                ...state
            };
        case 'START_GAME':
            state.setting.hash = Math.random();
            state.isGameStarted = true;
            state.isGameOver = false;
            return {
                ...state
            };
        case 'STOP_GAME':
            state.isGameStarted = false;
            return {
                ...state
            };
        case 'GAME_OVER':
            state.isGameOver = true;
            return {
                ...state
            };
        case 'SETTING':
            state.setting.hash = Math.random();
            state.setting = action.setting;
            return {
                ...state
            };
        case 'KEY_PRESSED':
            state.setting.key = action.key;
            state.hash = Math.random();
            return {
                ...state
            };
        default:
            break;
    }

    return state;
}