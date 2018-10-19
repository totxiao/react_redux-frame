/**
 * @author totlin
 * @data 2018/9/29 17:25
 */

import React from 'react';
import {Row, Col, Icon} from 'antd';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Menu from './menu';

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    /**
     * 注销登录
     * @return {void}
     */
    handleLogout(){
        this.props.service.logout({})
            .then(r => {
                this.props.logout();
                this.props.history.push("/login");
            })
    }

    render(){
        const {isLogin, authInfo} = this.props;
        return <div>
            <Row>
                <Col span={22}>
                    <Menu/>
                </Col>
                <Col span={2}>
                    <div>欢迎您：{!isLogin ? '游客' : authInfo.user.nickname}
                        { isLogin && <Icon onClick={this.handleLogout.bind(this)} title='注销' style={{marginLeft:10, cursor:'pointer'}} type='logout' />}
                        { !isLogin && <Icon title='去登录' style={{marginLeft:10, cursor:'pointer'}} type='login' />}
                    </div>
                </Col>
            </Row>

        </div>
    }
}

const mapStateToProps = (state)=> {
    const {login, app} = state;
    return {
        isLogin:login.isLogin,
        authInfo:login.authInfo,
        service:app.service
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //实质是一个action create
        logout:(info) => {
            dispatch({type:'logout'})
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));