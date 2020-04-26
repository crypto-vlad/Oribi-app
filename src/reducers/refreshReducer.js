import {
    REFRESH,
    REFRESH_TOKEN,
    REFRESH_ERROR
} from '../actions/types';

const initialState = {
    refreshRes: null,
    token_loading : false,
    refresh_error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REFRESH:
            return {
                ...state,
                token_loading: action.payload
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                refreshRes: action.payload,
                token_loading: action.loading
            };
        case REFRESH_ERROR:
            return {
                ...state,
                refresh_error: action.payload,
                token_loading: false
            };
        default:
            return state;
    }
}
