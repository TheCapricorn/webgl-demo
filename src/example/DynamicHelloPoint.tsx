import * as React  from  "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";

const {useEffect,useRef} =React;

const VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'attribute float a_PointSize;\n'+
    'void main(){\n'+
    'gl_Position=a_Position;\n'+
    'gl_PointSize=a_PointSize;\n'+
    '}';


const FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(0.0,0.0,0.0,1.0);\n'+
    '}';


const DynamicHelloPoint=()=>{
    const canvasRef=useRef(null);
    
    useEffect(()=>{
        
        if(!canvasRef.current){
          return 
        }
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
       //指定清空<canvas>的颜色
       gl.clearColor(1.0,0.0,0.0,1.0);
       //清空<canvas>
       gl.clear(gl.COLOR_BUFFER_BIT);
        let a_Position=gl.getAttribLocation(gl.program,'a_Position');
        let a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize')
        gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
        gl.vertexAttrib1f(a_PointSize,10.0)
        gl.drawArrays(gl.POINTS,0,1);    
    })

    return(
        <canvas ref={canvasRef} />
    )

}



export default DynamicHelloPoint
