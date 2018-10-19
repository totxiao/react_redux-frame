/**
 * @author totlin
 * @data 2018/9/29 18:06
 */

// 登录reducer

let defaultState ={
    //登录状态
    isLogin:false,
};
export default (state = defaultState , action = {info:undefined}) => {
    switch(action.type){
        case 'input':
            return Object.assign({}, state, {username:action.info.username,password:action.info.password});
        case 'login':
            console.log(Object.assign({}, state, {authInfo:action.info, isLogin:true}));
            return Object.assign({}, state, {authInfo:action.info, isLogin:true});
        default:
            return state;
    }
};