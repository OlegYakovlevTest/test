import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    SET_USER,
    LOG_OUT
} from '../constants/User';

const initialState = {
    username: null
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, fetching: true };
        case LOGIN_SUCCESS:
            return { ...state, ...action.data.user, fetching: false };
        case LOGIN_FAIL:
            return { ...state, error: action.error, fetching: false };
        case CREATE_USER_REQUEST:
            return { ...state, fetching: true };
        case CREATE_USER_SUCCESS:
            return { ...state, ...action.data.user, fetching: false };
        case CREATE_USER_FAIL:
            return { ...state, error: action.error, fetching: false };
        case SET_USER:
            return { ...state, ...action.user };
        case LOG_OUT:
            return { ...state, username: null, fetching: false };

        default:
            return state;
    }
}