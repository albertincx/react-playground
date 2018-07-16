import * as React from 'react';
import {connect} from 'react-redux';
import config from "Playground/config";
import {GameProps} from "Playground/interfaces/game";
import {ApplicationState} from "Playground/interfaces/app";

interface GameWrapper {
    key: string
}

export default function connectGame(GameComponent: any) {

    class Game extends React.Component<GameProps, GameWrapper> {
        private el: HTMLDivElement;

        constructor(props: GameProps) {
            super(props);
            this.state = {
                key: ''
            };
            this.handleKeyDown = this.handleKeyDown.bind(this);
            this.gameOver = this.gameOver.bind(this);
        }

        public componentDidMount() {
            this.el.addEventListener('keydown', this.handleKeyDown);
        }

        public componentWillUnmount() {
            this.el.removeEventListener('keydown', this.handleKeyDown);
        }

        public render() {
            const {width, height} = this.props.setting;
            const keys = {
                key: this.state.key
            };
            return (
                <div ref={el => this.el = el} tabIndex={0}>
                    <GameComponent
                        keys={keys}
                        width={width}
                        height={height}
                        onGameOver={this.gameOver}
                    />
                </div>
            );
        }

        private gameOver() {
            this.props.gameOver();
        }

        private handleKeyDown(event: KeyboardEvent) {
            event.preventDefault();
            const {isGameStarted, isGameOver} = this.props;
            let key: string = event.key;
            switch (key) {
                case ' ':
                    key = config.KEY_SPACE;
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
                    key = config.KEY_ESCAPE;
                    break;
                default:
                    break;
            }
            this.setState({key});
        }
    }

    const mapStateToProps = (state: ApplicationState): any => {
        const {isGameStarted, setting, setting: {hash}, isGameOver} = state.playground;
        // console.log(setting.key)
        return {
            isGameOver,
            setting,
            isGameStarted
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