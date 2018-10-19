/**
 * @author totlin
 * @data 2018/9/28 14:55
 */

//主页面reducer
import service from '../service/entry';

let defaultState ={
    //登录状态
    initialized:false,
    service:service,
    defaultRouter:'/home'
};
export default (state = defaultState , action = {}) => {
    switch(action.type){
        case 'init':
            return Object.assign({}, state, {initialized:true});
        default:
            return state;
    }
};