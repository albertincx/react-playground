import * as React from "react";
import {connect} from 'react-redux';
import Playground from "./components/Playground";

import './css/style.css';

class App extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
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

const mapStateToProps = (state: any): any => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};
export default connect<typeof mapStateToProps, typeof mapDispatchToProps, void>(mapStateToProps, mapDispatchToProps)(App);