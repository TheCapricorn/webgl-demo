import * as React from "react";
const {useEffect,useRef,Fragment} = React;
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'atribute vec4 a_Color;\n'+
    'uniform mat4 u_ProjMatrix;\n'+
    'varying vec4 v_Color;\n'+
    'void main(){\n'+
        'gl_Position=u_ProjMatrix*a_Position;\n'+
        'v_Color=a_Color;\n'+
    '}\n';
const FSHADER_SOURCE = 
    'precision mediump float;\n'+
    'varying vec4 v_Color;\n'+
    'void main(){\n'+
        'gl_FragColor=v_Color;\n'+
    '}';

function main(canvasRef:React.RefObject<any>):void{
    const gl:any = getWebGLContext(canvasRef.current,true);

    if(!gl){
        console.log('Failed to get the Rendering context for WebGL');
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return;
    }
    const n = initVertexBuffers(gl);


}

function initVertexBuffers(gl:any){
    const vertexColor = new Float32Array([
        0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
        -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
        0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,

        0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
        -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
        0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,

        0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one
        -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
        0.5, -0.5,   0.0,  1.0,  0.4,  0.4
    ]);

    const n=9;
    // 创建缓冲区对象
    const  vertexBuffer = gl.createBuffer();

    if(!vertexBuffer){
        console.log('Failed to the create buffer object');
        return -1;
    }

    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertexColor,gl.STATIC_DRAW);
    
    const FSIZE = vertexColor.BYTES_PER_ELEMENT;
    const a_Position = gl.getAttribLocation(gl.program,'a_Position');

    if(a_Position<0){
        console.log('Failed to get the storage location of a_Position')
        return -1;
    }

    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
    //连接a_Postion变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    const a_Color = gl.getAttribLocation(gl.program,'a_Color');

    if(a_Color<0){
        console.log('Failed to get the storage location of a_Color')
        return -1;
    }

    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*6,FSIZE*3);
    //连接a_Postion变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);//取消绑定的缓冲区对象
    return n;



}



const OrthoView =()=>{
    const canvasRef: React.RefObject<any>= useRef(null);

    useEffect(()=>{
        main(canvasRef);
    })

    return (
        <Fragment>
            <canvas  ref={canvasRef}/>
            <div></div>
        </Fragment>
    )
}


export default OrthoView