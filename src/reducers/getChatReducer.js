import {
    GET_CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAIL,
    SEND_MESSAGE_SUCCESS,
    RECEIVE_MESSAGE_SUCCESS,
    RESET_MESSAGE
} from '../actions/types';

const initialState = {
    createRoomRes: null,
    sendMsgRes: null,
    receiveMsgRes: null,
    loading: false,
    error: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CREATE_ROOM:
            return {
                ...state,
                loading: action.payload
            };
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                createRoomRes: action.payload,
                loading: action.loading
            };
        case CREATE_ROOM_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: action.loading
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sendMsgRes: action.payload,
                loading: action.loading
            };
        case RECEIVE_MESSAGE_SUCCESS:
            return {
                ...state,
                receiveMsgRes: action.payload,
                loading: action.loading
            };
        case RESET_MESSAGE:
            return {
                createRoomRes: null,
                sendMsgRes : null,
                receiveMsgRes: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}
