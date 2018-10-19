/**
 * @author totlin
 * @data 2018/9/29 17:59
 */

import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {Switch} from 'react-router-dom';
import _ from 'lodash';

class AuthRoute extends React.Component {
    /**
     * 构造器
     * @param {object} props 组件属性
     */
    constructor(props) {
        super(props);
    }

    /**
     * 渲染
     * @returns {XML} 组件内容
     */
    render() {
        const {isLogin, Component} = this.props;
        const routers = [];
        _.forEach(Component,(val, key) => {
            routers.push({path:'/' + key,component:val})
        });
        return (
            <div className='mi-app-content'>
                <Switch>{
                    isLogin ?
                        routers.map(c => (
                            <Route key={c.path}  path={c.path} component={c.component}/>
                        ))
                        : (
                            <Redirect to={{
                                pathname: '/login',
                            }}/>
                        )
                }
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    const {login, app} = state;
    return {
        isLogin:login.isLogin,
        defaultRouter:app.defaultRouter,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {}
};

AuthRoute = withRouter(AuthRoute);

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);

