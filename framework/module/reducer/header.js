/**
 * @author totlin
 * @data 2018/9/29 17:25
 */


let defaultState ={
};
export default (state = defaultState , action = {info:undefined}) => {
    switch(action.type){
        case 'logout':
            return Object.assign({}, state, {authInfo:null, isLogin:false});
        default:
            return state;
    }
};