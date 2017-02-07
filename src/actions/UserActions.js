import $ from 'jquery';
import { browserHistory } from 'react-router';

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOG_OUT
} from '../constants/User';

export function signIn(signInData) {
    return (dispatch) => {
        dispatch({
            type: GET_USER_REQUEST
        });

        $.ajax({
            method: 'GET',
            url: '/api/user',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: signInData
        }).done(function (data, textStatus, jqXHR) {
            if (!data.user) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            browserHistory.push('/about');
            dispatch({
                type: GET_USER_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: GET_USER_FAIL
            });
        });
    }
}

export function signUp(signUpData) {
    console.log(signUpData);

    return (dispatch) => {
        dispatch({
            type: CREATE_USER_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/api/user',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(signUpData)
        }).done(function (data, textStatus, jqXHR) {
            if (!data.user) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            browserHistory.push('/about');
            dispatch({
                type: CREATE_USER_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: CREATE_USER_FAIL
            });
        });
    }
}

export function logOut() {

    return (dispatch) => {
        browserHistory.push('/auth');
        dispatch({
            type: LOG_OUT
        });
    }
}