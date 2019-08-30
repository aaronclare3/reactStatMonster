import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    player: playerReducer,
    auth: authReducer,
    error: errorReducer
});