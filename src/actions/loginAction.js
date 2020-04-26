import axios from 'axios';

import {AsyncStorage} from 'react-native';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RESET_LOGIN
} from './types';
import { BASE_URL, LOGIN_API } from "../constants";

const instance = axios.create({
  baseURL: `${BASE_URL}`,
});

export const login = (username, password) => ( dispatch )=> {
    dispatch(fetchData(true));
    instance.post(LOGIN_API, {
        username,
        password
    })
        .then(res => {
            dispatch(fetchDataFulfilled(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
    
}

//Define your action create that set your loading state.
export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data.
    return {
        type: LOGIN,
        payload: bool,
    };
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: LOGIN_SUCCESS,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: LOGIN_FAIL,
        payload: error,
        loading: false,
    };
}

export const reset = () => dispatch => {
    dispatch({ type: RESET_LOGIN });
}
