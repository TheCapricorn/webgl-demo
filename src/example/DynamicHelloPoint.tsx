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
    'uniform vec4 a_FragColor;\n'+
    'void main(){\n'+
    'gl_FragColor=a_FragColor;\n'+
    '}';



const DynamicHelloPoint=()=>{
    const canvasRef=useRef(null);
    
    useEffect(()=>{
        
        if(!canvasRef.current){
          return 
        }
        const gl:any=getWebGLContext(canvasRef.current,true);
        initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
        //gl.getAttribLocation(gl.program,'a_Position');
    })

    return(
        <canvas ref={canvasRef} />
    )

}



export default DynamicHelloPoint
