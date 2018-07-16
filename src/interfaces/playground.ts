import {SharedProps, SharedReduxProps} from "./connect";

export interface PlaygroundProps extends SharedReduxProps {
    currentGame?: string
    readonly startGame: (setting?: any) => void
    readonly stopGame: () => void
}

export interface PlaygroundState extends SharedProps {
    currentGame?: string
    key?: string
    hash?: string
}
