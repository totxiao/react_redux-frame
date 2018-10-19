/**
 * @author totlin
 * @data 2018/9/29 17:18
 */
import React from 'react';
import HeaderContent from './header';
import {Layout} from 'antd';
const { Header, Content, Footer } = Layout;
import AuthRoute from './auth-route';

class MainLayout extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {Component} = this.props;
        return <Layout>
            <Header className='mi-app-header'>
                <HeaderContent  />
            </Header>
            <Content>
                <AuthRoute Component={Component}/>
            </Content>
            <Footer className='mi-app-footer' />
        </Layout>
    }
}

export default MainLayout;