import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import debounce from 'lodash/debounce';

import { REDUX_PRELOADED_STATE } from '../../helpers/constants';
import createStore from './createStore';
import routes from './routes';

const resolveInitialState = () => {
    const initialState = window[REDUX_PRELOADED_STATE];
    delete window[REDUX_PRELOADED_STATE];
    const initialStateScriptTag = document.getElementById(REDUX_PRELOADED_STATE);
    initialStateScriptTag.parentElement.removeChild(initialStateScriptTag);

    return initialState;
};

const InitialComponent = () => {
    const initialState = resolveInitialState();
    const store = createStore(initialState);
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Provider store={store}>
            <Router history={history} routes={routes} onUpdate={() => {/* todo: scroll to top */}} />
        </Provider>
    );
};

export default InitialComponent;
