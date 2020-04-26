import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    RESET_USER,
} from '../actions/types';

const initialState = {
    getUserRes: null,
    user_loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                user_loading: action.payload
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserRes: action.payload,
                user_loading: action.loading
            };
        case GET_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                user_loading: action.loading
            };
        case RESET_USER: 
            return {
                getUserRes: null,
                user_loading: false,
                error: null
            };
        default:
            return state;
    }
}