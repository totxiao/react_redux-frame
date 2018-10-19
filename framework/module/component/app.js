import React from 'react';
import {Spin} from 'antd';
import {connect} from "react-redux";
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from './login';
import MainLayout from './main-layout';

 class App extends React.Component{
    /**
     * 构造器
     * @param {object} props 组件属性
     */
    constructor(props) {
        super(props);
    }

     componentDidMount(){
         this.props.service.current({}).then(r => {
            //如果已经登录，则保存登录信息.
             if(r.data.user){
                 this.props.login(r.data)
             }
             this.props.init()
         })
     }

    /**
     * 渲染函数
     * @return {*} xml
     */
    render(){
        const {initialized, isLogin, Component} = this.props;
        return !initialized ? (
            <div className="mi-app-initializing">
                <div className="wrapper">
                    <Spin size="large"/>
                </div>
            </div>
        ) : (
            <Router>
                <div className='mi-app-initializing'>
                    <Switch>
                        {/*登录页面最优先匹配*/}
                        <Route path='/login' component={Login}/>
                        {/*其次匹配自定义布局页面*/}
                        {/*{pages.map(({name, path, requireLogin, component:Component, ...rest})=> {*/}
                            {/*return requireLogin ? (*/}
                                {/*<AuthRoute key={name} path={path} component={Component} {...rest}/>*/}
                            {/*) : (*/}
                                {/*<Route key={name} path={path} component={Component} {...rest}/>*/}
                            {/*)*/}
                        {/*})}*/}
                        {/*/!*然后匹配主布局页面*!/*/}
                        <MainLayout history={this.props.history} Component={Component}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state)=> {
     return {
         initialized:state.app.initialized,
         isLogin:state.login.isLogin,
         service:state.app.service
     }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init:() => dispatch({ type: 'init' }),
        login:(data) => dispatch({ type: 'login',info:data})
    }
};


const container = connect(mapStateToProps, mapDispatchToProps)(App);

export default container;