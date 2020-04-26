import {
    CHANGE_PASS,
    CHANGE_PASS_SUCCESS,
    CHANGE_PASS_FAIL,
    RESET_CHANGE_PASS
} from '../actions/types';

const initialState = {
    changePassRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_PASS:
            return {
                ...state,
                loading: action.payload
            };
        case CHANGE_PASS_SUCCESS:
            return {
                ...state,
                changePassRes: action.payload,
                loading: action.loading
            };
        case CHANGE_PASS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_CHANGE_PASS: 
            return {
                changePassRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}