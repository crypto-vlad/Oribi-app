import {
    RESTORE_TOKEN,
    SIGN_IN,
    SIGN_OUT,
    REFRESH_TOKEN,
} from '../actions/types';

const initialState = {
    userToken: null,
    refreshToken: null,
    isLoading: true,
    isSignout: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case REFRESH_TOKEN :
            return {
                ...state,
                refreshToken : action.refreshToken,
                isLoading : true,
            }
        case SIGN_IN:
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
            };
        case SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                userToken: null,
            };
        default:
            return state;
    }
}