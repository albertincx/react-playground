import * as React from "react";
import {connect} from 'react-redux';
import config from 'Playground/config';
import connectGame from "Playground/components/Game";

class Playground extends React.Component<{}, {}> {


    constructor(props: any) {
        super(props);
        this.stopGame = this.stopGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }



    public render() {

        let currentGame = 'Snake';
        const GameComponent = currentGame ? require('./games/' + currentGame).default : null;
        const LoadedGame = connectGame(GameComponent);
        return (
            <div className='playground'>
                <LoadedGame/>
            </div>
        );
    }

    private startGame() {
        //
    }

    private stopGame() {
        //
    }



}

const mapStateToProps = (state: any): any => {
    return {};
};

const mapDispatchToProps = (dispatch: any): any => {
    return {};
};

export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(Playground);