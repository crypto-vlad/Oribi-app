import {
    GET_LANG
} from '../actions/types';

const initialState = {
    isLoading: true,
    language: '0'
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LANG:
            return {
                ...state,
                language: action.lang,
                isLoading: false,
            };
        default:
            return state;
    }
}