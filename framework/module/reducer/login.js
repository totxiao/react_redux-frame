/**
 * @author totlin
 * @data 2018/9/28 10:57
 */

// 登录reducer

let defaultState ={
        //登录状态
        isLogin:false,
        //用户信息
        authInfo:undefined,
        //用户输入用户名
        username:undefined,
        //用户输入密码
        password:undefined
};
export default (state = defaultState , action = {info:undefined}) => {
    switch(action.type){
        case 'input':
            return Object.assign({}, state, {username:action.info.username,password:action.info.password});
        case 'login':
            return Object.assign({}, state, {authInfo:action.info, isLogin:true});
        default:
            return state;
    }
};