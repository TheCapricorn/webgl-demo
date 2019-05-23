import * as React from "react";
import {getWebGLContext, initShaders} from "lib/cuon-utils"
const {useRef,useEffect} = React;


const VSHADER_SOURCE = 
        "attribute vec4 a_Postion;\n"+
        "attribute vec4 a_Color;\n"+
        "uniform  mat4 u_ViewMatrix;\n"+
        "uniform mat4 u_ProjMatrix;\n"+
        "varying vec4 v_Color;\n"+
        "void main(){\n"+
            "gl_Position = u_ViewMatrix*u_ProjMatrix*a_Postion;\n"+
            "gl_PointSize = 10.0;\n"+
            "v_Color = a_Color;\n"+
        "}/n";
const FSHADER_SOURCE = 
        'precision mediump float;\n'+ 
        "varying vec4 v_Color;\n"+
        "void main(){/n"+
            "gl_FragColor=v_Color;\n"+
        "}/n";
type canvasRefObj = React.RefObject<object | null>;
type WebGLContex= WebGLObject | null;
function main(canvasRef:canvasRefObj){
 if(!canvasRef){
     console.log('Failed to retrieve the <canvas> element');
    return;
 }

 const gl:WebGLContex = getWebGLContext(canvasRef,true);
 if(!gl){
    console.log('Failed to get the rendering context for webgl');
    return;
 }

 if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
    console.log('Failed to initialize shaders');
    return;
 }
 // 设置顶点位置
 const n = initVertexBuffer(gl);

   if(n<0){
        console.log('Failed to the position of the  vertices')
        return;
   }

   const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');


}

function initVertexBuffer(gl:any):number{
    const verticesColors = new Float32Array([
          // Three triangles on the right side
          0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
          0.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
          1.25, -1.0,  -4.0,  1.0,  0.4,  0.4,

          0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
          0.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
          1.25, -1.0,  -2.0,  1.0,  0.4,  0.4,

          0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one
          0.25, -1.0,   0.0,  0.4,  0.4,  1.0,
          1.25, -1.0,   0.0,  1.0,  0.4,  0.4,

          // Three triangles on the left side
          -0.75,  1.0,  -4.0,  0.4,  1.0,  0.4, // The back green one
          -1.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
          -0.25, -1.0,  -4.0,  1.0,  0.4,  0.4,

          -0.75,  1.0,  -2.0,  1.0,  1.0,  0.4, // The middle yellow one
          -1.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
          -0.25, -1.0,  -2.0,  1.0,  0.4,  0.4,

          -0.75,  1.0,   0.0,  0.4,  0.4,  1.0,  // The front blue one
          -1.25, -1.0,   0.0,  0.4,  0.4,  1.0,
          -0.25, -1.0,   0.0,  1.0,  0.4,  0.4,
    ]);

    const n = 18;

    //创建缓存区对象
    const verteColorBuffer = gl.createBuffer();
    if(!verteColorBuffer){
        console.log("Failed to create the buffer object")
        return -1;
    }
    //把缓存区对象绑定到目标上去
    gl.bindBuffer(gl.ARRAY_BUFFER,verteColorBuffer);

    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

    const FSIZE = verticesColors.BYTES_PER_ELEMENT;

    const a_Position  = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0){
        console.log('Failed to get the storage location  of a_Position ');
        return -1;
    }
    //将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
    //连接a_Position变量分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);


    const a_Color  = gl.getAttribLocation(gl.program,'a_Color');
    if(a_Color<0){
        console.log('Failed to get the storage location  of a_Color ');
        return -1;
    }
    //将缓冲区对象分配给 a_Color 变量
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*6,FSIZE*3);
    //连接a_Color变量分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Color);
    // 取消绑定对象
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    return n;


}



const  PerspectiveView =()=>{
    const canvasRef:canvasRefObj = useRef(null);

    useEffect(()=>{
            main(canvasRef)
    },[])
    return <canvas  ref={canvasRef}/>
}

export default PerspectiveView