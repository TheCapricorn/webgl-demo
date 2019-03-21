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

const initTextures=(gl:any,n:number)=>{
    const texture =gl.createTexture();

    if(!texture){
        console.log('Failed to create the texture object');
        return false;
    }
    const u_Sampler= gl.getUniformLocation(gl.program,'u_Sampler');

    if(!u_Sampler){
        console.log('Failed to get the u_Sampler object');
        return false;
    }
    const image= new Image();
    if(!u_Sampler){
        console.log('Failed to create the image object');
        return false;
    }
    image.onload=function(){
        loadTexture(gl,n,u_Sampler,texture,image);
    }

    return true;
}

const loadTexture=(gl:any,n:number,u_Sampler:object,texture:object,image:object)=>{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//对纹理图像进行y轴反转
    //开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    //向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    //将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);//绘制矩形
}



const TexturedQuad=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,SHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        const n= initVertexBuffers(gl);
        initTextures(gl,n)
        

    })
    return (<canvas ref={canvasRef} />)
    
}

export default TexturedQuad