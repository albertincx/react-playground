export interface SharedProps {
    setting?: {
        [key: string]: any
    },
    isGameStarted?: boolean,
    isGameOver?: boolean,
}

export interface SharedReduxProps extends SharedProps {
    dispatch?: {
        type: string
        data?: string
    };
}