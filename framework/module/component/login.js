/**
 * @author totlin
 * @data 2018/9/26 18:00
 */
import React from 'react';
import {Button, Row, Col, Input, Message} from 'antd';
import {connect} from "react-redux";

class Login extends React.Component{
    state = { loading: false};
    constructor(props){
        super(props);
    }

    handleInput(type, event){
        const info = {
            username:this.props.username,
            password:this.props.password
        };
        let value = event.target.value;
        switch (type){
            case 'username':
                info.username = value;
                break;
            case 'password':
                info.password = value;
                break;

        }
        this.props.input(info);
    }

    handleLogin(){
        this.setState({loading: true});
         this.props.service.login({data:{
                loginKey:this.props.username,
                password:this.props.password
            }}).then((data) => {
             this.setState({loading: false});
             this.props.login(data.data);
             this.props.history.push('/home');
         }, () => {
             this.setState({loading: false});
         });
    }

    render(){
        const {username, password, input} = this.props;
        return <div className='mi-app-login'>
            <h4 className='mi-app-login-title'>登录</h4>
            <Row className='mi-app-login-form' >
                <Col className='mi-app-login-form-item' span={6}>用户名：</Col>
                <Col span={16}><Input onChange={this.handleInput.bind(this, 'username')} value={username} /></Col>
            </Row>
            <Row className='mi-app-login-form'>
                <Col className='mi-app-login-form-item' span={6}>密码：</Col>
                <Col span={16}><Input type='password' onChange={this.handleInput.bind(this, 'password')} value={password} /></Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    <Button loading={this.state.loading} type="primary" onClick={this.handleLogin.bind(this)} className='mi-app-login-button'>登录</Button>
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
        username:login.username,
        password:login.password,
        service:app.service
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //实质是一个action create
        input:(info) => {
            dispatch({type:'input', info:info})
        },
        login:(data) => dispatch({ type: 'login',info:data})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);