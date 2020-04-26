import axios from 'axios';

import {
    GET_LOCKHISTORY,
    GET_LOCKHISTORY_SUCCESS,
    GET_LOCKHISTORY_FAIL,
    RESET_LOCKHISTORY
} from './types';

import { BASE_URL, GET_LOCKHISTORY_DATA } from "../constants";

const instance = axios.create({
    baseURL: `${BASE_URL}`,
});

export const get_lockhistory = (token, id) => dispatch => {
    dispatch(fetchData(true));
    instance.get(GET_LOCKHISTORY_DATA + `${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            dispatch(fetchDataFulfilled(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
}

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_LOCKHISTORY,
        payload: bool,
    };
}

export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_LOCKHISTORY_SUCCESS,
        payload: data,
        loading: false,
    };
}

export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_LOCKHISTORY_FAIL,
        payload: error,
        loading: false,
    };
}

export const reset_lockhistory = () => dispatch => {
    dispatch({ type: RESET_LOCKHISTORY });
}