import {
    GET_FLAT,
    GET_FLAT_SUCCESS,
    GET_FLAT_FAIL,
    RESET_FLAT
} from '../actions/types';

const initialState = {
    getFlatRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FLAT:
            return {
                ...state,
                loading: action.payload
            };
        case GET_FLAT_SUCCESS:
            return {
                ...state,
                getFlatRes: action.payload,
                loading: action.loading
            };
        case GET_FLAT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_FLAT: 
            return {
                getFlatRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}