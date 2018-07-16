import {SharedReduxProps} from "./connect";
import {PlaygroundState} from "Playground/interfaces/playground";

export interface AppProps extends SharedReduxProps {
    currentGame?: string,
    readonly selectGame: (values: any) => void
    readonly gameSetting: (setting: object) => void
}
export interface ApplicationState {
    playground: PlaygroundState;
}