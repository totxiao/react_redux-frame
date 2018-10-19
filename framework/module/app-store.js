/**
 * @author totlin
 * @data 2018/9/20 18:06
 */

import React from 'react';
import App from './component/app';
import {createStore, applyMiddleware, compose} from 'redux';
import {makeAllReducer} from './util/reducer-utils'
import thunk from 'redux-thunk';
import * as commonReducer from './reducer/_entry';

/**
 * 应用程序Store
 */
export default class AppStore{
    constructor(props){
        this.Component = props.Component;
        this.localReducer = props.reducer;
        //合成主reducer
        this.rootReducer = makeAllReducer({...commonReducer, ...this.localReducer});
    }

    /**
     * 生成根组件方法
     */
    createApp(){
        return <App Component={this.Component}/>;
    }

    /**
     * 生成根store方法
     */
    createStore(){
        const store = createStore(
            this.rootReducer,
            applyMiddleware(thunk));
        return store;
        // const middlewares = [thunk];
        //
        // const enhancers = [];
        //
        // if (process.env.NODE_ENV === 'development') {
        //     const devToolsExtension = window.devToolsExtension;
        //     if (typeof devToolsExtension === 'function') {
        //         enhancers.push(devToolsExtension());
        //     }
        // }
        //
        // const store = createStore(
        //     makeAllReducer(initialReducer),
        //     initialState,
        //     compose(
        //         applyMiddleware(...middlewares),
        //         ...enhancers
        //     )
        // );
        //
        // store.asyncReducers = {
        //     ...initialReducer
        // };
        //
        // return store;
    }
}