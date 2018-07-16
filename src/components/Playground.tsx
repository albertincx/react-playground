import * as React from "react";
import {connect} from 'react-redux';
import connectGame from "Playground/components/Game";
import {PlaygroundProps} from "Playground/interfaces/playground";
import {ApplicationState} from "Playground/interfaces/app";

class Playground extends React.Component<PlaygroundProps, {}> {

    constructor(props: any) {
        super(props);
        this.stopGame = this.stopGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    public render() {

        const {currentGame} = this.props;
        let Game = null;
        if (currentGame) {
            try {
                const GameComponent = require('./games/' + currentGame).default;
                Game = connectGame(GameComponent);
            } catch (e) {
                //
            }
        }
        return (
            <div className='playground'>
                {Game ? <Game/> : null}
            </div>
        );
    }

    private startGame() {
        this.props.startGame();
    }

    private stopGame() {
        this.props.stopGame();
    }
}

const mapStateToProps = (state: ApplicationState): any => {
    const {currentGame, isGameStarted, setting, isGameOver} = state.playground;
    return {
        isGameOver,
        hash: setting.hash,
        setting,
        currentGame,
        isGameStarted
    };
};

const mapDispatchToProps = (dispatch: any): PlaygroundProps => {
    return {
        startGame: (setting?: any): void => dispatch({type: "START_GAME", setting}),
        stopGame: (): void => dispatch({type: "STOP_GAME"}),
    };
};

export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(Playground);