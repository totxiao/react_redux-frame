/**
 * @author totlin
 * @data 2018/9/29 18:05
 */

import React from 'react';
import {connect} from "react-redux";
import timg0 from '../../image/timg0.jpg';
import timg1 from '../../image/timg1.jpg';
import timg2 from '../../image/timg2.jpg';
import timg3 from '../../image/timg3.jpg';
import timg4 from '../../image/timg4.jpg';
import PictureBlockView from '../../directive/picture-block/picture-block';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div style={{background:'#000'}}>
                <PictureBlockView width={1280} height={800} imageSrcs={[timg0, timg1, timg2, timg3, timg4]}/>
        </div>
    }
}
const mapStateToProps = (state)=> {
    return {
        initialized:state.app.initialized,
        isLogin:state.login.isLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init:() => dispatch({ type: 'init' })
    }
};


const container = connect(mapStateToProps, mapDispatchToProps)(Home);

export default container;