/**
 * @author totlin
 * @data 2018/10/17 15:41
 */
import React from 'react';

class FragmentView extends React.Component{
    constructor(props){
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.fixLeft = props.left;
        this.fixTop = props.top;
        this.imageSrcs = this.createIterator(props.imageSrcs);
        this.opacity = 1;
        this.state = {
            imageSrc:this.imageSrcs.next(),
            left:props.left,
            top:props.top,
            opacity:1,
            duration:Math.random()+2,
            delay:Math.random()/2
        };
        setTimeout(() => {
            this.move();
            setInterval(() => {
                this.move();
            }, 8000)
        },2000)


    }

    /**
     * 迭代器模拟
     */
    createIterator(items){
        let i = 0;
        return {
            next: function() {
                let done = i <= items.length;
                let value = done ? items[i++] : items[0];
                i = done ? i : 0;
                return value;
            }
        };
    }

    move(){
            this.setState({
                left:this.state.left + Math.random()*2000-1000,
                top:this.state.top + Math.random()*800-400,
                opacity:0,
                duration:Math.random()+2,
                delay:Math.random()/2
            });
            setTimeout(() => {
                this.setState({
                    imageSrc:this.imageSrcs.next(),
                    left:this.fixLeft,
                    top:this.fixTop,
                    opacity:1,
                    duration:Math.random()+2,
                    delay:Math.random()/2
                });
                // clearInterval(back);
            },4000)
    }



    render(){
        const {width, height, fixLeft,fixTop} = this;
        const {left,top, opacity,imageSrc} = this.state;
        return <i style={{width:width,
            height:height,
            left:left,
            top:top,
            position:'absolute',
            backgroundImage:'url('+ imageSrc+')',
            backgroundSize:width*10+'px '+ height*10,
            backgroundPosition:-fixLeft+'px '+ -fixTop+'px',
            opacity:opacity,
            transition:'all '+this.state.duration+'s ease '+this.state.delay+'s'
        }}></i>
    }
}

export default FragmentView;