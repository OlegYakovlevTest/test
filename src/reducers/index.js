import { combineReducers } from 'redux';
import marker from './marker';
import user from './user';

export default combineReducers({
    marker,
    user
});