import {
    GET_AGREEDETAIL,
    GET_AGREEDETAIL_SUCCESS,
    GET_AGREEDETAIL_FAIL,
    RESET_AGREEDETAIL
} from '../actions/types';

const initialState = {
    getAgreeDetailRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AGREEDETAIL:
            return {
                ...state,
                loading: action.payload
            };
        case GET_AGREEDETAIL_SUCCESS:
            return {
                ...state,
                getAgreeDetailRes: action.payload,
                loading: action.loading
            };
        case GET_AGREEDETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_AGREEDETAIL: 
            return {
                getAgreeDetailRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}