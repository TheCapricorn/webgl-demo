import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const {useRef,useEffect} = React;

const SHADER_SOURCE=
'attribute vec4 a_Position;\n'+
'attribute vec2 a_TextCord;\n'+
'varying vec2 v_TextCord;\n'+
'void main(){\n'+
'gl_Position=a_Position;\n'+
'v_TextCord=a_TextCord;\n'+
'}\n';
const FSHADER_SOURCE=
'#ifdef GL_ES\n' +
'precision mediump float;\n' +
'#endif\n' +
'uniform sampler2D u_Sampler;\n'+
'varying vec2 v_TextCord;\n'+
'void main(){'+
'gl_FragColor=texture2D(u_Sampler,v_TextCord);\n'+
'}\n'
;

const initVertexBuffers=(gl:any)=>{
    const n=4;
    const verticesTexCoords =new Float32Array([
        -0.5,0.5,0.0,1.0,
        -0.5,-0.5,0.0,0.0,
        0.5,0.5,1.0,1.0,
        0.5,-0.5,1.0,0.0,
    ]);
    const vertexBuffers= gl.createBuffer();
    if(!vertexBuffers){
        console.log("Failed to create thie buffer object");
        return -1
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers);
    gl.bufferData(gl.ARRAY_BUFFER,verticesTexCoords ,gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    const a_TextCord = gl.getAttribLocation(gl.program,'a_TextCord');
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    gl.VertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
    gl.VertexAttribPointer(a_TextCord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2)
    gl.enableAttribArray(a_Position);
    gl.enableAttribArray(a_TextCord);
    return n;

}



const TexturedQuad=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,SHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n= initVertexBuffers(gl);

        

    })
    return (<canvas ref={canvasRef} />)
    
}

export default TexturedQuad