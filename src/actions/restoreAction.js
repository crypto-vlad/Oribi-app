import axios from 'axios';
import {
    RESTORE_TOKEN,
    SIGN_IN,
    SIGN_OUT
} from './types';


export const restoreToken = (userToken) => dispatch => {
    dispatch({ type: RESTORE_TOKEN, token: userToken});
}


export const signIn = (userToken) => dispatch => {
    dispatch({ type: SIGN_IN, token: userToken });
}

export const signOut = () => dispatch => {
    dispatch({ type: SIGN_OUT });
}

