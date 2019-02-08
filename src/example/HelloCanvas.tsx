import * as React from "react";
import {getWebGLContext} from "../lib/cuon-utils"

class HelloCanvas extends React.PureComponent{
    canvas=React.createRef() as any
    render():JSX.Element{
        return(
            <canvas ref={this.canvas}/>
        )
    }

    componentDidMount(){
        const gl= getWebGLContext(this.canvas.current,true);
        if(!gl){
            return;
        }
        //指定清空<canvas>的颜色
        gl.clearColor(1.0,0.0,0.0,1.0);
        //清空<canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        
    }
    
}

export default HelloCanvas