import {
    SAVE_MARKERS_REQUEST,
    SAVE_MARKERS_SUCCESS,
    SAVE_MARKERS_FAIL,
    GET_MARKERS_REQUEST,
    GET_MARKERS_SUCCESS,
    GET_MARKERS_FAIL
} from '../constants/Marker';

const initialState = {
    markers: []
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case SAVE_MARKERS_REQUEST:
            return { ...state, fetching: true };
        case SAVE_MARKERS_SUCCESS:
            return { ...state, ...action.data, fetching: false };
        case SAVE_MARKERS_FAIL:
            return { ...state, error: action.error, fetching: false };
        case GET_MARKERS_REQUEST:
            return { ...state, fetching: true };
        case GET_MARKERS_SUCCESS:
            return { ...state, markers: [...action.markers], fetching: false };
        case GET_MARKERS_FAIL:
            return { ...state, error: action.error, fetching: false };

        default:
            return state;
    }
}