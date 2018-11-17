import axios from 'axios'

import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes';

export function auth(email, password, isLogin) {
    return async (dispatch) => {
        const FIREBASE_SIGNIN = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
        const FIREBASE_SIGNUP = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
        const API_KEY = 'AIzaSyB8hCAytWwhvZ9qr4I6v5CA2ZD1sFt6A74';

        const AUTH_DATA = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = isLogin ? FIREBASE_SIGNIN : FIREBASE_SIGNUP
        let data;
        let expirationDate;

        axios.post(url+API_KEY, AUTH_DATA)
            .then(res => {
                console.log(res.data);
                data = res.data
                expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

                localStorage.setItem('token', data.idToken)
                localStorage.setItem('userId', data.localId)
                localStorage.setItem('expirationDate', expirationDate)

                dispatch(authSuccess(data.idToken))
                dispatch(autoLogout(data.expiresIn))

            })
            .catch(err => console.log(err));
    }
    
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(expiresIn) {
    console.log(expiresIn)
    return dispatch => {
        setTimeout(() => dispatch(logout()),expiresIn * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout( (expirationDate.getTime() - new Date().getTime()) / 1000));
            }

        }
    }
}