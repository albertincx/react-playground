import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducers = () => {}
export const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);