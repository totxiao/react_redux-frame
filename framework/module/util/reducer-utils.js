/**
 * @author totlin
 * @data 2018/9/25 14:28
 */
import {combineReducers} from 'redux';
import {connect} from "react-redux";

//reducer工具库
//    makeAllReducer用于生成 rootReducers
//    injectReducer用于替换  rootReducers
//    createReducer 用于 生成单个 reducer

export const makeAllReducer = (asyncReducers) => {
    return combineReducers({...asyncReducers})
};

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeAllReducer(store.asyncReducers));
};

export const createReducer = (initialState, ACTION_HANDLES) => (
    (state = initialState, action) => {
        const handler = ACTION_HANDLES[action.type];
        return handler ? handler(state, action) : state;
    }
);