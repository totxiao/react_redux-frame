/**
 * @author totlin
 * @data 2018/10/17 15:40
 */
import React from "react";
import Fragment from './fragment';

//图片碎化效果，图片必须大小相同

class PictureBlock{
    constructor(props){
        this.fragments = [];
        this.imageSrcs = props.imageSrcs;
        this.width = props.width;
        this.height = props.height;

        this.pictureCutting();

    }

    /**
     * 图片裁剪
     * @return {void}
     */
    pictureCutting(){
        for(let x = 0; x < 10; x++){
            for(let y = 0; y < 10; y++){
                this.fragments.push({
                    left:this.width/10*x,
                    top:this.height/10*y,
                })
            }
        }
    }

}

class PictureBlockView extends React.Component{
    constructor(props){
        super(props);
        this.store = new PictureBlock(props);
    }

    render(){
        const {width, height, imageSrcs} = this.props;
        return <div style={{width:width, height:height, position:'relative', overflow:'hidden',background:'#000' ,margin:'0 auto'}}>
            {this.store.fragments.map((f, i) => (
                <Fragment key={i} width={width/10} height={height/10} left={f.left} top={f.top} imageSrcs={imageSrcs}></Fragment>
            ))}
        </div>
    }
}

export default PictureBlockView;