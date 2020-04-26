import {
    RESTORE_FBNAME,
    FB_SIGN_IN,
    FB_SIGN_OUT
} from './types';

export const restoreFBName = (firstName, lastName) => dispatch => {
    dispatch({ type: RESTORE_FBNAME, firstName: firstName, lastName: lastName });
}

export const fbSignIn = (firstName, lastName) => dispatch => {
    dispatch({ type: FB_SIGN_IN, firstName: firstName, lastName: lastName });
}

export const fbSignOut = () => dispatch => {
    dispatch({ type: FB_SIGN_OUT });
}