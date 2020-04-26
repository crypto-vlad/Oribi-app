import {
    GET_SERHISTORY,
    GET_SERHISTORY_SUCCESS,
    GET_SERHISTORY_FAIL,
    RESET_SERHISTORY
} from '../actions/types';

const initialState = {
    getServiceHistoryRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SERHISTORY:
            return {
                ...state,
                loading: action.payload
            };
        case GET_SERHISTORY_SUCCESS:
            return {
                ...state,
                getServiceHistoryRes: action.payload,
                loading: action.loading
            };
        case GET_SERHISTORY_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_SERHISTORY: 
            return {
                getServiceHistoryRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}