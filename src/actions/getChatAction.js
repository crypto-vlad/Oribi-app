import axios from 'axios';

import {
    GET_CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAIL,
    SEND_MESSAGE_SUCCESS,
    RECEIVE_MESSAGE_SUCCESS,
    RESET_MESSAGE
} from './types';
import { BASE_URL, CREATE_CHAT_DATA, SEND_MESSAGE_DATA, RECEIVE_MESSAGE_DATA } from "../constants";

const instance = axios.create({
  baseURL: `${BASE_URL}`,
});

export const create_chat_room = (lang, customerId, customerFName, customerLName, platform) => dispatch => {
    dispatch(fetchData(true));
    instance.post(CREATE_CHAT_DATA, {
        lang,
        customerId,
        customerFName,
        customerLName,
        platform
    })
        .then(res => {
            dispatch(fetchDataFulfilled(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
}

export const send_msg = (chatId, guestId, message, chatToken) => dispatch => {
    instance.post(SEND_MESSAGE_DATA, {
        "chatId":chatId,
        "guestId":guestId,
        "message":message,
        "chatToken": chatToken,
    })
        .then(res => {
            console.log(res.data)
            fetchDataSendMsg(res.data);
        }).catch(err => dispatch(fetchDataRejected(err)));
}

export const receive_msg = (chatId, chatToken) => dispatch => {
    instance.get(RECEIVE_MESSAGE_DATA + `${chatId}/?chatToken=${chatToken}`)
        .then(res => {
            console.log(res.data)
            dispatch(fetchDataReceiveMsg(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
}
//Define your action create that set your loading state.
export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_CREATE_ROOM,
        payload: bool,
    };
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: CREATE_ROOM_SUCCESS,
        payload: data,
        loading: false,
    };
}

export const fetchDataSendMsg = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: SEND_MESSAGE_SUCCESS,
        payload: data,
        loading: false,
    };
}

export const fetchDataReceiveMsg = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: RECEIVE_MESSAGE_SUCCESS,
        payload: data,
        loading: false,
    };
}
//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: CREATE_ROOM_FAIL,
        payload: error,
        loading: false,
    };
}

export const reset_messge = () => dispatch => {
    dispatch({ type: RESET_MESSAGE });
}