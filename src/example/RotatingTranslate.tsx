import * as React from "react";
const {useEffect,useRef} =React;
import {getWebGLContext,initShaders} from "lib/cuon-utils";
import {Matrix4} from "lib/cuon-matrix";
const VSHADER_SOURCE=
'attribute vec4 a_Position;\n'+
'uniform mat4 u_ModelMatrix;\n'+
'void main(){\n'+
'gl_Position= u_ModelMatrix*a_Position;\n'+
'}\n';

const FSHADER_SOURCE=
'void main(){'+
'gl_FragColor= vec4(1.0,0.0,0.0,0.0);\n'+
'}';

const initVertexBuffers=(gl:any)=>{
    const vertexBuffer=gl.createBuffer();
    const n=3;
    const vertices= new Float32Array([
        -0.5,0.5,0.5,-0.5,0.5,0.5
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

    return n;
}

const RotatingTranslate=()=>{
    const canvasRef= useRef(null);
    useEffect(()=>{
        const gl:any= getWebGLContext(canvasRef.current,true);
   
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }

        const n=initVertexBuffers(gl);
        if(n===-1){
            return;
        }
        gl.clearColor(0.0,0.0,0.0,1.0);
        const u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');
        if(u_ModelMatrix<0){
            console.log("Failed to get the storage location of u_xformMatrix");
            return;
        }
        const modelMatrix= new Matrix4();

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES,0,n);
    })
    return(
        <canvas ref={canvasRef} />
    )
}

export default RotatingTranslate