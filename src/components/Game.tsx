import * as React from 'react';
import {connect} from 'react-redux';
import {GameProps} from "Playground/interfaces/game";
import {ApplicationState} from "Playground/interfaces/app";

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
            this.gameOver = this.gameOver.bind(this);
        }

        public render() {
            const {setting, isGameStarted} = this.props;
            const keys = {
                key: setting.key
            };

            return (
                <div style={{
                    width: setting.width + 'px',
                    height: setting.height + 'px'
                }}>
                    {isGameStarted ? <GameComponent
                        keys={keys}
                        width={setting.width}
                        height={setting.height}
                        isGameStarted={isGameStarted}
                        onGameOver={this.gameOver}
                    /> : null}
                </div>
            );
        }

        private gameOver() {
            this.props.gameOver();
        }

    }

    const mapStateToProps = (state: ApplicationState): any => {
        const {isGameStarted, setting, hash, isGameOver} = state.playground;
        return {
            hash,
            isGameOver,
            isGameStarted,
            setting
        };
    };
    const mapDispatchToProps = (dispatch: any): GameProps => {
        return {
            gameOver: (): void => dispatch({type: "GAME_OVER"}),
            restart: (): void => dispatch({type: "RESTART_GAME"}),
        };
    };

    return connect<typeof mapStateToProps, GameProps, void>(mapStateToProps, mapDispatchToProps)(Game);
}