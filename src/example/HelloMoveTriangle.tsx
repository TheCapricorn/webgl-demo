import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils"
const {useEffect,useRef} = React;

const VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'uniform vec4 u_Move;\n'+
    'void main(){\n'+
    'gl_Position=a_Position+u_Move;\n'+
    '}';
const FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}';

const initVertexBuffers=function(gl:any){
    const n=3;
    const vertexBuffer=gl.createBuffer();
    const vertices= new Float32Array([
        -0.5,0.5,0.5,-0.5,0.2,0.5
    ]);
    if(!vertexBuffer){
        console.log('Failed to set positions of the vertices');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    return n

}

const HelloMoveTriangle = ()=>{
    const canvasRef=useRef(null);

    useEffect(()=>{
        const gl:any= getWebGLContext(canvasRef.current,true);
      
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n=initVertexBuffers(gl);

        if(n<0){
            return;
        }
        const u_Move = gl.getUniformLocation(gl.program,'u_Move');
        gl.uniform4f(u_Move,-0.3,-0.4,0.0,0.0)
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES,0,n);

    })

    return(
        <canvas ref={canvasRef} />
    )
}

export default HelloMoveTriangle
