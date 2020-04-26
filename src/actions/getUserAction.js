import axios from 'axios';

import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    RESET_USER
} from './types';
import { BASE_URL, GET_USER_PROFILE } from "../constants";

const instance = axios.create({
  baseURL: `${BASE_URL}`,
});

export const get_user = (token) => dispatch => {
    dispatch(fetchData(true));
    instance.get(GET_USER_PROFILE, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            dispatch(fetchDataFulfilled(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
}

//Define your action create that set your loading state.
export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_USER,
        payload: bool,
    };
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_USER_SUCCESS,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_USER_FAIL,
        payload: error,
        loading: false,
    };
}

export const reset_user = () => dispatch => {
    dispatch({ type: RESET_USER });
}