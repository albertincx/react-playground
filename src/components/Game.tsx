import * as React from 'react';
import {connect} from 'react-redux';
import config from "Playground/config";

export default function connectGame(GameComponent: any) {

    class Game extends React.Component<{}, {}> {
        private el: HTMLDivElement;

        constructor(props: any) {
            super(props);
            this.state = {
                key: ''
            };
            this.handleKeyDown = this.handleKeyDown.bind(this);

        }

        public componentDidMount() {
            this.el.addEventListener('keydown', this.handleKeyDown);
        }

        public componentWillUnmount() {
            this.el.removeEventListener('keydown', this.handleKeyDown);
        }

        private handleKeyDown(event: KeyboardEvent) {
            event.preventDefault();
            const isGameStarted = false;
            const isGameOver = false;
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
            this.setState({
                key
            });
        }

        gameOver() {
            //
        }

        render() {
            const props = {...this.props};
            props.setting = {
                key: this.state.key
            };

            return (
                <div ref={el => this.el = el} tabIndex={0}>
                    <GameComponent
                        {...props}
                        onGameOver={this.gameOver}
                    />
                </div>
            );
        }
    }

    function mapStateToProps() {
        return {};
    }

    return connect(mapStateToProps)(Game);
}