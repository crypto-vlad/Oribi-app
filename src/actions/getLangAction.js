import {
    GET_LANG,
} from './types';

export const getLang = (lang) => dispatch => {
    dispatch({ type: GET_LANG, lang: lang});
}