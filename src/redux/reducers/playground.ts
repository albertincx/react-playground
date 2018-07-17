import {PlaygroundState} from "Playground/interfaces/playground";
import {PlaygroundAction} from "../types/actions";

import config from "Playground/config";
import ReduxConstants from "Playground/redux/types/redux";

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

        case ReduxConstants.GAME_SELECTED: {
            state.currentGame = action.currentGame;
            return {
                ...state
            };
        }
        case ReduxConstants.RESTART_GAME:
            state.setting.hash = Math.random();
            state.isGameStarted = true;
            state.isGameOver = false;
            return {
                ...state
            };
        case ReduxConstants.START_GAME:
            state.setting.hash = Math.random();
            state.isGameStarted = true;
            state.isGameOver = false;
            return {
                ...state
            };
        case ReduxConstants.STOP_GAME:
            state.isGameStarted = false;
            state.setting.hash = Math.random();
            return {
                ...state
            };
        case ReduxConstants.GAME_OVER:
            state.isGameOver = true;
            state.setting.score = action.data;
            return {
                ...state
            };
        case ReduxConstants.SETTING:
            state.setting.hash = Math.random();
            state.setting = action.setting;
            return {
                ...state
            };
        case ReduxConstants.KEY_PRESSED:
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