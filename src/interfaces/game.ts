import {SharedReduxProps} from "Playground/interfaces/connect";

export interface GameProps extends SharedReduxProps {
    key?: string
    hash?: string
    readonly gameOver: (score: object) => void
    readonly restart: () => void
}

export interface CustomGameProps extends GameProps {
    keys: {
        key: string
    }
}