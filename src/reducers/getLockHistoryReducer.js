import {
    GET_LOCKHISTORY,
    GET_LOCKHISTORY_SUCCESS,
    GET_LOCKHISTORY_FAIL,
    RESET_LOCKHISTORY
} from '../actions/types';

const initialState = {
    getLockHistoryRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOCKHISTORY:
            return {
                ...state,
                loading: action.payload
            };
        case GET_LOCKHISTORY_SUCCESS:
            return {
                ...state,
                getLockHistoryRes: action.payload,
                loading: action.loading
            };
        case GET_LOCKHISTORY_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_LOCKHISTORY: 
            return {
                getLockHistoryRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}