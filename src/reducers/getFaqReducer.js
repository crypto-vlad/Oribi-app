import {
    GET_FAQ,
    GET_FAQ_SUCCESS,
    GET_FAQ_FAIL,
    RESET_FAQ,
} from '../actions/types';

const initialState = {
    getFaqRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FAQ:
            return {
                ...state,
                loading: action.payload
            };
        case GET_FAQ_SUCCESS:
            return {
                ...state,
                getFaqRes: action.payload,
                loading: action.loading
            };
        case GET_FAQ_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_FAQ: 
            return {
                getFaqRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}