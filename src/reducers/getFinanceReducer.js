import {
    GET_FINANCE,
    GET_FINANCE_SUCCESS,
    GET_FINANCE_FAIL,
    RESET_FINANCE
} from '../actions/types';

const initialState = {
    getFinanceRes: null,
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FINANCE:
            return {
                ...state,
                loading: action.payload
            };
        case GET_FINANCE_SUCCESS:
            return {
                ...state,
                getFinanceRes: action.payload,
                loading: action.loading
            };
        case GET_FINANCE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case RESET_FINANCE: 
            return {
                getFinanceRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}