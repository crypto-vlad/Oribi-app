import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import restoreTokenReducer from './restoreTokenReducer';
import getLangReducer from './getLangReducer';
import getBalReducer from './getBalReducer';
import getUserReducer from './getUserReducer';
import restoreFBNameReducer from './restoreFBNameReducer';
import changePassReducer from './changePassReducer';
import getFaqReducer from './getFaqReducer';
import getFinanceReducer from './getFinanceReducer';
import getFlatReducer from './getFlatReducer';
import getAgreeDetailReducer from './getAgreeDetailReducer';
import getServiceHistoryReducer from './getServiceHistoryReducer';
import getLockHistoryReducer from './getLockHistoryReducer';
import getChatReducer from './getChatReducer';
import refreshReducer from './refreshReducer';

export const rootReducer = combineReducers({
    loginReducer: loginReducer,
    restoreTokenReducer: restoreTokenReducer,
    refreshReducer : refreshReducer,
    getLangReducer: getLangReducer,
    getBalReducer: getBalReducer,
    getUserReducer: getUserReducer,
    restoreFBNameReducer: restoreFBNameReducer,
    changePassReducer: changePassReducer,
    getFaqReducer: getFaqReducer,
    getFinanceReducer :getFinanceReducer,
    getFlatReducer : getFlatReducer,
    getAgreeDetailReducer : getAgreeDetailReducer,
    getServiceHistoryReducer:getServiceHistoryReducer,
    getLockHistoryReducer:getLockHistoryReducer,
    getChatReducer : getChatReducer,
});
