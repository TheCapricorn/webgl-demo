import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils"
const {useEffect,useRef} = React;

const VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'uniform float u_CosB,u_SinB;\n'+
    'void main(){\n'+
    'gl_Position.x=a_Position.x*u_CosB-a_Position.y*u_SinB;\n'+
    'gl_Position.y= a_Position.x*u_SinB+a_Position.y*u_CosB;\n'+
    'gl_Position.z=a_Position.z;\n'+
    'gl_Position.w=1.0;\n'+
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

const HelloRotateTriangle = ()=>{
    const canvasRef=useRef(null);

    useEffect(()=>{
        const angle= 90;
        const gl:any= getWebGLContext(canvasRef.current,true);
      
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n=initVertexBuffers(gl);

        if(n<0){
            return;
        }

        const u_SinB = gl.getUniformLocation(gl.program,'u_SinB');
        const u_CosB = gl.getUniformLocation(gl.program,'u_CosB');
        gl.uniform1f(u_SinB,Math.sin(Math.PI*angle/180.0));
        gl.uniform1f(u_CosB,Math.cos(Math.PI*angle/180.0));
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES,0,n);
    })

    return(
        <canvas ref={canvasRef} />
    )
}

export default HelloRotateTriangle