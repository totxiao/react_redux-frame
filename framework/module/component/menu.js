/**
 * @author totlin
 * @data 2018/10/15 10:39
 */
import React from 'react';
import fireSrc from '../../image/fire.gif';

class Menu extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div className='mi-app-menu'>
                <div className='mi-app-title'>
                    <svg viewBox="0 0 600 300" className='title-svg'>
                        <pattern id="p-fire" viewBox="30 100 186 200" patternUnits="userSpaceOnUse" width="216" height="200" x="-70" y="35">
                            <image href={fireSrc} width="256" height="300"></image>
                        </pattern>
                        <text textAnchor="middle" x="50%" y="50%" dy=".35em" className="title-word">
                            快乐肥宅屋
                        </text>
                    </svg>
                </div>
                <div className='mi-app-menu-box'>
                    <ul>
                        <li>
                            <span className='p1'>代码</span>
                            <span className='p2'>CODE</span>
                        </li>
                        <li>
                            <span className='p1'>游戏</span>
                            <span className='p2'>GAME</span>
                        </li>
                        <li>
                            <span className='p1'>小说</span>
                            <span className='p2'>NETWORK NOVEL</span>
                        </li>
                        <li>
                            <span className='p1'>动漫</span>
                            <span className='p2'>ANIMATION</span>
                        </li>
                        <li>
                            <span className='p1'>音乐</span>
                            <span className='p2'>MUSIC</span>
                        </li>
                    </ul>
                </div>
        </div>
    }
}

export default Menu