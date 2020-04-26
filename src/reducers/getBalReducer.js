import {
    GET_BAL,
    GET_BAL_SUCCESS,
    GET_BAL_FAIL,
    RESET_BAL,
} from '../actions/types';

const initialState = {
    getBalRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BAL:
            return {
                ...state,
                loading: action.payload
            };
        case GET_BAL_SUCCESS:
            return {
                ...state,
                getBalRes: action.payload,
                loading: action.loading
            };
        case GET_BAL_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_BAL: 
            return {
                getBalRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}