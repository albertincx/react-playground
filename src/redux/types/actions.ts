import {SharedProps} from "../../interfaces/connect";

export interface Action extends SharedProps {
    type: string
}

export interface PlaygroundAction extends Action {
    currentGame?: string
    key?: any
    data?: object
}