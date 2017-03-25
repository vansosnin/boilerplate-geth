import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import mainPageReducer from '../components/MainPage/reducer';

export default combineReducers({
    mainPage: mainPageReducer,
    routing: routerReducer
});
