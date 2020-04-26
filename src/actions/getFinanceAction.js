import axios from 'axios';

import {
    GET_FINANCE,
    GET_FINANCE_SUCCESS,
    GET_FINANCE_FAIL,
    RESET_FINANCE
} from './types';

import { BASE_URL, GET_FINANCE_DATA } from "../constants";

const instance = axios.create({
    baseURL: `${BASE_URL}`,
});

export const get_finance = (token) => dispatch => {
    dispatch(fetchData(true));
    instance.get(GET_FINANCE_DATA, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
            dispatch(fetchDataFulfilled(res.data));
        }).catch(err => dispatch(fetchDataRejected(err)));
}

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_FINANCE,
        payload: bool,
    };
}

export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_FINANCE_SUCCESS,
        payload: data,
        loading: false,
    };
}

export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_FINANCE_FAIL,
        payload: error,
        loading: false,
    };
}

export const reset_finance = () => dispatch => {
    dispatch({ type: RESET_FINANCE });
}