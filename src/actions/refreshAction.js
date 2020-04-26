import axios from 'axios';
import {
    REFRESH,
    REFRESH_TOKEN,
    REFRESH_ERROR
} from './types';

import { BASE_URL, GET_REFRESH_TOKEN } from "../constants";

export const refresh_token = (token) => dispatch => {
    const instance = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
            'Authorization': 'Bearer ' + token,
        }
      });
      
    dispatch({type:REFRESH, payload: true});
    instance.post(GET_REFRESH_TOKEN)
    .then(res => {
        dispatch(fetchDataFulfilled(res.data.token));
    }).catch(err => dispatch({type: REFRESH_ERROR, payload: err}));
}

export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: REFRESH_TOKEN,
        payload: data,
        loading: false
    };
}