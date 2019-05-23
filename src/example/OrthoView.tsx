import * as React from "react";
const {useEffect,useRef,useState,useCallback,Fragment} = React;
import {getWebGLContext,initShaders} from "lib/cuon-utils";
import { Matrix4 } from '@/lib/cuon-matrix';
const VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'attribute vec4 a_Color;\n'+
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


interface setObject {
    setGNear:React.Dispatch<any>,
    setGFar:React.Dispatch<any>,
    setGL:React.Dispatch<any>,
    setU_ProjMatrix:React.Dispatch<any>,
    setProjMatrix:React.Dispatch<any>
    setVertex:React.Dispatch<any>,
}

function main(canvasRef:React.RefObject<any>,obj:setObject){
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
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    const u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
    const projMatrix = new Matrix4();

    document.onkeydown=function(ev){
        keyDown(ev,gl,n,u_ProjMatrix,projMatrix,obj);
    }
    obj.setGL(gl);
    obj.setVertex(n);
    obj.setProjMatrix(projMatrix);
    obj.setU_ProjMatrix(u_ProjMatrix);

    return function(){
        document.onkeydown=null;
    }
}


const add = function(n:number):number{
    return n+0.01;
}

const dec = function(n:number):number{
    return n-0.01;
}

function keyDown(ev:any, gl:any, n:number, u_ProjMatrix:any, projMatrix:any,obj:setObject){
    switch(ev.keyCode){
        case 39: obj.setGNear(add) ; break; //right
        case 37: obj.setGNear(dec) ;break //left
        case 38: obj.setGFar(add); break; //up
        case 40: obj.setGFar(dec); break; //down
        default: return;
    }

   
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
    const [gl,setGL]:Array<any> = useState(null);
    const [vertex,setVertex] = useState(0);
    const [u_ProjMatrix,setU_ProjMatrix] = useState(null);
    const [projMatrix,setProjMatrix]:Array<any> = useState(null);
    const [g_near,setGNear] = useState(0.0);
    const [g_far,setGFar] = useState(0.5);
    const draw = useCallback(function(projMatrix,g_near,g_far,u_ProjMatrix,gl,vertex){
        //设置视点和视线
        console.info(projMatrix)
       projMatrix.setOrtho(-1,1,-1,1,g_near,g_far);
       //将视图矩阵传递给u_ViewMatrix变量
       gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements);
       gl.clear(gl.COlOR_BUFFER_BIT);
       gl.drawArrays(gl.TRIANGLES, 0, vertex);
   },[])

    useEffect(()=>{ 
        console.log('update',canvasRef.current);
        return main(canvasRef,{setGNear,setGFar,setGL,setU_ProjMatrix,setProjMatrix,setVertex});
    },[]);
    
    useEffect(()=>{
        console.log(g_near)
        if(!projMatrix || !u_ProjMatrix || !vertex || !gl){
            return;
        }
        
        draw(projMatrix,g_near,g_far,u_ProjMatrix,gl,vertex)
    },[projMatrix,g_near,g_far,u_ProjMatrix,gl,vertex])

    return (
        <Fragment>
            <canvas  ref={canvasRef}/>
            <div>
                <p>near:{g_near}</p>
                <p>far:{g_far}</p>
            </div>
        </Fragment>
    )
}


export default OrthoView