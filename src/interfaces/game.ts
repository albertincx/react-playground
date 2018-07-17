import {SharedReduxProps} from "Playground/interfaces/connect";

export interface GameProps extends SharedReduxProps {
    key?: string
    hash?: string
    readonly gameOver: () => void
    readonly restart: () => void
}

export interface CustomGameProps extends GameProps {
    keys: {
        key: string
    }
}