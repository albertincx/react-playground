import * as React from "react";
import {connect} from 'react-redux';
import Playground from "./components/Playground";

import './css/style.css';
import {ApplicationState, AppProps} from "Playground/interfaces/app";

class App extends React.Component<AppProps, {}> {

    constructor(props: any) {
        super(props);
    }
    public componentDidMount() {
        this.props.selectGame('Snake');
    }

    public render() {
        return (
            <div className='application'>
                <h1>Welcome to playground application</h1>
                <Playground/>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState): any => {
    const {currentGame, setting, setting: {hash}} = state.playground;
    return {
        hash,
        setting,
        currentGame
    };
};

const mapDispatchToProps = (dispatch: any): AppProps => {
    return {
        selectGame: (currentGame: string): any => dispatch({type: "GAME_SELECTED", currentGame}),
        gameSetting: (setting: object): any => dispatch({
            type: 'SETTING',
            setting
        })
    };
};
export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(App);
