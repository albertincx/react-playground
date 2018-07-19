const MAX_SPEED = 10;
const MIN_SPEED = 3;
const SPEED_STEP = 1;
const MIN_WIDTH = 500;
const MIN_HEIGHT = 250;

// playgroundMIN_WIDTH % x === 0 !important
const CELL_BOX = 25;

const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_SPACE = 'SPACE';
const KEY_ESCAPE = 'Escape';

const AXIS_X = 0;
const AXIS_Y = 1;

interface ConstObject {
    readonly MAX_SPEED: number,
    readonly MIN_SPEED: number,
    readonly MIN_WIDTH: number,
    readonly MIN_HEIGHT: number,
    readonly CELL_BOX: number,
    readonly SPEED_STEP: number,

    readonly KEY_LEFT: string,
    readonly KEY_RIGHT: string,
    readonly KEY_UP: string,
    readonly KEY_DOWN: string,
    readonly KEY_SPACE: string,
    readonly KEY_ESCAPE: string,

    readonly AXIS_X: number,
    readonly AXIS_Y: number,
    [key: string]: any,
}

const Config: ConstObject = {
    MAX_SPEED,
    MIN_SPEED,
    SPEED_STEP,
    MIN_WIDTH,
    MIN_HEIGHT,
    CELL_BOX,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    KEY_DOWN,
    KEY_SPACE,
    KEY_ESCAPE,
    AXIS_X,
    AXIS_Y
};

export default Config;