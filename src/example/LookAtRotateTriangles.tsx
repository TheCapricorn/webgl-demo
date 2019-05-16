import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
import {Matrix4} from "lib/cuon-matrix";
const {useRef,useEffect} = React;
const VSHADER_SOURCE:string = 
        'attribute vec4 a_Position;\n'+
        'attribute vec4 a_Color;\n'+
        'uniform mat4 u_ViewMatrix;\n'+
        'uniform mat4 u_ModelMatrix;\n'+
        'varying vec4 v_Color;\n'+
        'void main(){\n'+
                'gl_Position = u_ViewMatrix*u_ModelMatrix*a_Position;\n'+
                'gl_PointSize = 10.0;\n'+
                'v_Color = a_Color;\n'+
        '}\n';
const FSHADER_SOURCE:string =
        'precision mediump float;\n' +//!!! 需要声明浮点数精度，否则报错No precision specified for (float)
        'varying vec4 v_Color;\n'+
        'void main(){\n'+
                'gl_FragColor = v_Color;\n'+
        '}\n';

function main(canvas:React.RefObject<any>):void{
  
        if (!canvas) {
                console.log("Failed to retrieve the <canvas> element");
                return;
        }
        const gl:any = getWebGLContext(canvas,true);

        if(!gl){
            console.log("Failed to get the rendering context for WebGL");
            return;
        }

        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            console.log("Failed to initialize shaders.");
            return;
        }

         //设置顶点位置

        const  n =initVertexBuffers(gl);

        if(n<0){
            console.log("Failed to Failed to get the storage location of a_Position");
            return;
        }

        const u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
        const  viewMatrix:any = new Matrix4();
        viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
        gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);
        const u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
        const modelMatrix :any = new Matrix4();
        modelMatrix.setRotate(-50, 0, 0, -1);
        gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
        gl.clearColor(0.0,0.0,0.0,1.0);
        //清空<canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, n);


        
} 

function initVertexBuffers(gl:any){
    const verticesColors = new Float32Array([
         1.2,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
        -0.3, -0.5,  -0.4,  0.4,  1.0,  0.4,
         0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,

       
    ]); 
    const n = 3;

    //创建缓冲区对象
    const verteColorBuffer = gl.createBuffer();
    if(!verteColorBuffer){
        console.log("Failed to create thie buffer object");
        return -1;
    }
    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER,verteColorBuffer);
     //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);
    const FSIZE = verticesColors.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0){
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }

    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
    //连接a_Postion变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program,'a_Color');
    if(a_Color<0){
        console.log("Failed to get the storage location of a_Color");
        return -1;
    }

    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    return n;
}

const LookAtRotateTriangles = ()=>{
        const canvasRef:React.RefObject<any> = useRef(null);
        useEffect(()=>{
               
                main(canvasRef.current)
        })
        return (
                <canvas ref={canvasRef} />
        )
}

export default LookAtRotateTriangles

                 
 