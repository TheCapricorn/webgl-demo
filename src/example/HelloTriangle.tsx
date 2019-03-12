import * as React from  'react';
import {getWebGLContext,initShaders} from "lib/cuon-utils";

const {useEffect,useRef} = React;

const VSHADER_SOURCE=
      'attribute vec4 a_Position;\n'+
      'void main(){\n'+
      'gl_Position=a_Position;\n'+
      '}' 

const FSHADER_SOURCE=
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main(){\n'+
    'gl_FragColor=u_FragColor;\n'+
    '}'
const initVertexBuffers=(gl:any)=>{
    const n=3;
    const vertices=new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ])
    const vertexBuffers=gl.createBuffer();//创建buffer
    if(!vertexBuffers){
        console.log('Failed to set positions of the vertices');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers);// 绑定缓冲区对象到当前目标
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW)//数据写入到缓冲区
    let a_Position = gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);//将缓冲区对象分配给变量
    gl.enableVertexAttribArray(a_Position);//连接 a_Position变量与分配给它的缓冲区对象
    return n;
}


const HelloTriangle = ()=>{
    const canvasRef= useRef(null);
    useEffect(()=>{
        const gl:any= getWebGLContext(canvasRef.current,true);
        if(!gl){
            return;
        }

        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n=initVertexBuffers(gl);
        if(n<0){
            return;
        }
        const u_FragColor= gl.getUniformLocation(gl.program,'u_FragColor');

        gl.uniform4f(u_FragColor,1.0,0.0,0.0,1.0);
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES,0,n);
    })
    return (<canvas ref={canvasRef} />)
}

export default HelloTriangle