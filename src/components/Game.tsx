import * as React from 'react';
import {connect} from 'react-redux';
import {GameProps} from "Playground/interfaces/game";
import {ApplicationState} from "Playground/interfaces/app";
import ReduxConstants from "Playground/redux/types/redux";
import config from "Playground/config";

interface GameWrapper {
    key: string
}

export default function connectGame(GameComponent: any) {

    class Game extends React.Component<GameProps, GameWrapper> {

        constructor(props: GameProps) {
            super(props);
            this.state = {
                key: ''
            };
            this.onGameOver = this.onGameOver.bind(this);
            this.restart = this.restart.bind(this);
        }

        public render() {
            const {setting, isGameStarted, isGameOver} = this.props;
            const keys = {
                key: setting.key
            };
            return (
                <div style={{
                    width: setting.width + config.CELL_BOX + 'px',
                    height: setting.height + config.CELL_BOX + 'px'
                }}>
                    {isGameStarted ? <GameComponent
                        keys={keys}
                        setting={setting}
                        isGameStarted={isGameStarted}
                        isGameOver={isGameOver}
                        gameOver={this.onGameOver}
                    /> : null}
                    {isGameOver ? <div className='game-over-wrapper'>
                        <div className='game-over'>Game over</div>
                        <button className='image-repeat' onClick={this.restart}/>
                    </div> : null}
                </div>
            );
        }

        private restart() {
            this.props.restart();
        }

        private onGameOver() {
            this.props.gameOver();
        }

    }

    const mapStateToProps = (state: ApplicationState): any => {
        const {isGameStarted, setting, setting: {hash}, isGameOver} = state.playground;
        return {
            hash,
            isGameOver,
            isGameStarted,
            setting
        };
    };
    const mapDispatchToProps = (dispatch: any): GameProps => {
        return {
            gameOver: (): void => dispatch({type: ReduxConstants.GAME_OVER}),
            restart: (): void => dispatch({type: ReduxConstants.RESTART_GAME}),
        };
    };

    return connect<typeof mapStateToProps, GameProps, void>(mapStateToProps, mapDispatchToProps)(Game);
}