import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RESET_LOGIN
} from '../actions/types';

const initialState = {
    loginRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                loading: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginRes: action.payload,
                loading: action.loading
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_LOGIN:
            return {
                loginRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}
