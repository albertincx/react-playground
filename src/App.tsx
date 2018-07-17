import * as React from "react";
import {connect} from 'react-redux';
import config from 'Playground/config';
import Playground from "Playground/components/Playground";
import {ApplicationState, AppProps} from "Playground/interfaces/app";

import './css/style.css';
import 'react-rangeslider/lib/index.css';
import ReduxConstants from "Playground/redux/types/redux";

const Slider = require('react-rangeslider').default;

class App extends React.Component<AppProps, {}> {
    private readonly maxWidth: number;
    private readonly maxHeight: number;

    constructor(props: any) {
        super(props);
        this.maxWidth = window.innerWidth - 50;
        this.maxHeight = window.innerHeight - 200;
        this.handleChange = this.handleChange.bind(this);

    }

    public componentDidMount() {
        this.props.selectGame('Snake');
    }

    public render() {
        const {setting, currentGame} = this.props;

        return (
            <div className='application'>
                <h1>Welcome to playground application</h1>
                <div>
                    <div>Dimensions</div>
                    <br/>
                    <Slider
                        min={config.MIN_WIDTH}
                        max={this.maxWidth}
                        value={setting.width}
                        step={setting.cellBox}
                        onChange={(value: number) => this.handleChange(value, 'width')}
                    />
                    <Slider
                        min={config.MIN_HEIGHT}
                        max={this.maxHeight}
                        value={setting.height}
                        step={setting.cellBox}
                        onChange={(value: number) => this.handleChange(value, 'height')}
                    />
                    <div>Speed</div>
                    <Slider
                        min={1}
                        max={config.MAX_SPEED}
                        value={setting.speed}
                        step={1}
                        onChange={(value: number) => this.handleChange(value, 'speed')}
                    />
                </div>
                <div>{currentGame} loaded</div>
                <Playground/>
            </div>
        );
    }

    private handleChange(value: number, name: string) {
        const {setting} = this.props;
        setting[name] = value;
        this.props.gameSetting(
            setting
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
        selectGame: (currentGame: string): any => dispatch({type: ReduxConstants.GAME_SELECTED, currentGame}),
        gameSetting: (setting: object): any => dispatch({
            type: ReduxConstants.SETTING,
            setting
        })
    };
};
export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(App);
