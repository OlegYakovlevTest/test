import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOG_OUT
} from '../constants/User';

const initialState = {
    username: null
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case GET_USER_REQUEST:
            return { ...state, fetching: true };
        case GET_USER_SUCCESS:
            return { ...state, ...action.data.user, fetching: false };
        case GET_USER_FAIL:
            return { ...state, error: action.error, fetching: false };
        case CREATE_USER_REQUEST:
            return { ...state, fetching: true };
        case CREATE_USER_SUCCESS:
            return { ...state, ...action.data.user, fetching: false };
        case CREATE_USER_FAIL:
            return { ...state, error: action.error, fetching: false };
        case LOG_OUT:
            return { ...state, username: null, fetching: false };

        default:
            return state;
    }
}