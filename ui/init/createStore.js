import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import buildTarget from '../../tasks/webpack/buildTarget';
import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

const __DEV__ = process.env.NODE_ENV !== 'production';
const __IS_CLIENT__ = process.env.BUILD_TARGET === buildTarget.client;
const sagaMiddleware = createSagaMiddleware();

const includeDevTools = () => {
    if (__DEV__ && window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return f => f;
};

const getMiddleware = () => {
    let middleware = [thunk, sagaMiddleware];

    return middleware;
};

const commonCreateStore = (initialState = {}) => {
    let store;

    if (__IS_CLIENT__) {
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...getMiddleware()),
                includeDevTools()
            )
        );

        sagaMiddleware.run(rootSaga);
    } else {
        store = createStore(
            rootReducer,
            initialState
        );
    }

    return store;
};

export default commonCreateStore;
