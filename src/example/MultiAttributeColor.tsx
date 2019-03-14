import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const {useEffect,useRef}= React;
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    'gl_Position = a_Position;\n' +
    'gl_PointSize = 10.0;\n' +
    'v_Color = a_Color;\n' +
    '}\n';

var FSHADER_SOURCE=
    'precision mediump float;\n' +//!!! 需要声明浮点数精度，否则报错No precision specified for (float)  
    'varying vec4 v_Color;\n' +
    'void main(){\n'+
    'gl_FragColor = v_Color;\n'+
    '}\n';
const initVertexBuffer=(gl:any)=>{
    let n=-1;
    const vertexBuffer= gl.createBuffer();
    const verticesColors=new Float32Array([
        0.0,0.5,1.0,0.0,0.0,
        -0.5,0.0,0.0,1.0,0.0,
        0.5,0.0,0.0,0.0,1.0
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    const a_Color = gl.getAttribLocation(gl.program,'a_Color');
    const FSIZE = verticesColors.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*5,0);
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*5,FSIZE*2);
    n=3;
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);
    return  n;
}
const MultiAttributeColor=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n= initVertexBuffer(gl);
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.log(n);
        gl.drawArrays(gl.TRIANGLES,0,n);
    });
    return(<canvas ref={canvasRef} />)
}


export default MultiAttributeColor