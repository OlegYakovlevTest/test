import $ from 'jquery';

import {
    SAVE_MARKERS_REQUEST,
    SAVE_MARKERS_SUCCESS,
    SAVE_MARKERS_FAIL,
    GET_MARKERS_REQUEST,
    GET_MARKERS_SUCCESS,
    GET_MARKERS_FAIL
} from '../constants/Marker';

export function saveMarkers(markers) {

    return (dispatch) => {
        dispatch({
            type: SAVE_MARKERS_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/markers',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(markers)
        }).done(function (data, textStatus, jqXHR) {
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: SAVE_MARKERS_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: SAVE_MARKERS_FAIL
            });
        });
    }
}

export function getMarkers() {

    return (dispatch) => {
        dispatch({
            type: GET_MARKERS_REQUEST
        });

        $.ajax({
            method: 'GET',
            url: '/markers',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).done(function (data, textStatus, jqXHR) {
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: GET_MARKERS_SUCCESS,
                markers: data.markers
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: GET_MARKERS_FAIL
            });
        });
    }
}