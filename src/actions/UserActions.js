import $ from 'jquery';
import { browserHistory } from 'react-router';

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

export function signIn(signInData) {
    // headers: {
    //     Authorization: 'JWT token'
    // },
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/signin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(signInData)
        }).done(function (data, textStatus, jqXHR) {
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            browserHistory.push('/about');
            dispatch({
                type: LOGIN_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: LOGIN_FAIL
            });
        });
    }
}

export function signUp(signUpData) {

    return (dispatch) => {
        dispatch({
            type: CREATE_USER_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/signup',
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
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
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
    localStorage.clear();
    return (dispatch) => {
        browserHistory.push('/auth');
        dispatch({
            type: LOG_OUT
        });
    }
}

export function setUser(user) {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            user
        });
    }
}