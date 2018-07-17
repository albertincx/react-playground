import * as React from "react";
import {connect} from 'react-redux';
import connectGame from "Playground/components/Game";
import {PlaygroundProps} from "Playground/interfaces/playground";
import {ApplicationState} from "Playground/interfaces/app";
import config from "Playground/config";
import ReduxConstants from "Playground/redux/types/redux";

class Playground extends React.Component<PlaygroundProps, {}> {
    private el: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.stopGame = this.stopGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    public componentDidMount() {
        this.el.addEventListener('keydown', this.handleKeyDown);
    }

    public componentWillUnmount() {
        this.el.removeEventListener('keydown', this.handleKeyDown);
    }

    public render() {
        const {setting, isGameStarted, currentGame, isGameOver} = this.props;
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
            <div className='playground' style={{
                width: setting.width + config.CELL_BOX + 'px',
                height: setting.height + config.CELL_BOX + 'px'
            }} ref={el => this.el = el} tabIndex={0}>
                <div className="game-space">
                    {currentGame ? <div>
                        {isGameStarted ? <Game/> : null}
                        {isGameStarted ?
                            <button onClick={this.stopGame} className='control'>Stop Game (or press `Esc`)</button> :
                            <button className='game-start control' onClick={this.startGame}>Press Space to start
                                game</button>}
                    </div> : null}
                </div>
            </div>
        );
    }

    private handleKeyDown(event: KeyboardEvent) {
        event.preventDefault();
        const {isGameStarted, isGameOver} = this.props;
        let key: string = event.key;
        switch (key) {
            case ' ':
                if (!isGameStarted || isGameOver) {
                    return this.startGame();
                } else {
                    key = config.KEY_SPACE;
                }
                break;
            case 'w':
                key = config.KEY_UP;
                break;
            case 'd':
                key = config.KEY_RIGHT;
                break;
            case 's':
                key = config.KEY_DOWN;
                break;
            case 'a':
                key = config.KEY_LEFT;
                break;
            case config.KEY_ESCAPE:
                return this.stopGame();
            default:
                break;
        }
        if (isGameStarted) {
            this.props.command(key);
        }
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
        startGame: (setting?: any): void => dispatch({type: ReduxConstants.START_GAME, setting}),
        stopGame: (): void => dispatch({type: ReduxConstants.STOP_GAME}),
        command: (key: string): void => dispatch({type: ReduxConstants.KEY_PRESSED, key})
    };
};

export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(Playground);