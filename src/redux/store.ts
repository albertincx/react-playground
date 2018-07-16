import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import thunkMiddleware from 'redux-thunk';
import playground from './reducers/playground';
import {ApplicationState} from "Playground/interfaces/app";

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    playground,
});

export const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);