import {
    RESTORE_FBNAME,
    FB_SIGN_IN,
    FB_SIGN_OUT,
} from '../actions/types';

const initialState = {
    firstName: null,
    lastName: null,
    isFBLoading: true,
    isSignout: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case RESTORE_FBNAME:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                isFBLoading: false,
            };
        case FB_SIGN_IN:
            return {
                ...state,
                isSignout: false,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        case FB_SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                firstName: null,
                lastName: null,
            };
        default:
            return state;
    }
}