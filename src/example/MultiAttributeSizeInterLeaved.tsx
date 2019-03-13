import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const {useRef,useEffect}=React;

const VSHADER_SOURCE=
'atrribute vec4 a_Position;\n'+
'attribute float a_PointSize;\n'+
'void main(){\n'+
'gl_Position=a_Position;\n'+
'gl_PointSize=a_PointSize;\n'+
'}';
const FSHADER_SOURCE=
'void main(){\n'+
'gl_FragColor=vec4(1.0,0.0,0.0,0.0);\n'+    
'}';

const initVexterBuffer=(gl:any)=>{
    const vexterBuffer=gl.createBuffer();
    const verticesSize=new Float32Array([
        0.0,0.5,10.0,
        -0.5,0.0,20.0,
        0.5,0.0,30.0,
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER,vexterBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesSize,gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    const a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    const FSIZE = verticesSize.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*3,0) ;
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*3,FSIZE*2);
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);
};

const MultiAttributeSizeInterLeaved=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any = getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n= initVexterBuffer(gl)


        
    })
    return(
        <canvas ref={canvasRef} />
    )
}


export default MultiAttributeSizeInterLeaved