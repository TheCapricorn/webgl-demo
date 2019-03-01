import * as React from "react";
import {getWebGLContext, initShaders} from "lib/cuon-utils";
const {useRef,useState,useEffect} = React;

const VSHADER_SOURCE=
      'attribute vec4 a_Position;\n'+
      'attribute float a_PonitSize;\n'+
      'void main(){\n'+
      'gl_Position=a_Position;\n'+
      'gl_PointSize=a_PonitSize;\n'+
      '}' 

const FSHADER_SOURCE=
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main(){\n'+
    'gl_FragColor=u_FragColor;\n'+
    '}'

type colorType =  number[][];

const ColorPoint=()=>{
    const canvasRef=useRef(null);
    const [gl,setGl] = useState(null);
    const [gPoints,setgPoints] = useState([] as colorType);
    const [gColors,setgColors] = useState([] as colorType);
    const [aPosition,setaPosition] = useState(null);
    const [aPointSize,setaPointSize] = useState(null);
    const [uFragColor,setuFragColor] = useState(null);
    const contextGl = gl as any;
    const init=()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!gl){
            return;
        }

        if(initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const a_Position=gl.getAttribLocation(gl.program,'a_Position');
        const a_PonitSize=gl.getAttribLocation(gl.program,'a_PointSize');
        const u_FragColor=gl.getUniformLocation(gl.program,'u_FragColor');
        setaPosition(a_Position);
        setaPointSize(a_PonitSize);
        setuFragColor(u_FragColor);
        setGl(gl);
    }

    

    const onClick=(e:any)=>{
        let rect=null;
        let x = e.clientX;
        let y = e.clientY;
        let currentPoints=[]
        let currentColor=[];
        let current:any=canvasRef.current
        if(!current){
            return;
        }
        rect = current.getBoundingClientRect();
        x=(x-rect.left-current.width/2)/current.width/2;
        y=(y-rect.top-current.height/2)/current.height/2;
        currentPoints = [...gPoints,[x,y]]
        setgPoints( currentPoints );

        // first quadrant
        if(x<0 && y>0){
            currentColor=[...gColors,[1.0,0.0,0.0,1.0]]
        }else 
        if(x>0 && y>0){
            currentColor=[...gColors,[0.0,1.0,0.0,1.0]]
        }else
        if(x<0 && y<0){
            currentColor=[...gColors,[0.0,0.0,1.0,1.0]]
        }else{
            currentColor=[...gColors,[1.0,1.0,1.0,1.0]]
        }
        setgColors(currentColor);
    }

    const draw=(gPoints:colorType,gColors:colorType)=>{
        const l=gPoints.length;

        for(let i=0;i<l;i++){
            const cPoint = gPoints[i];
            const cColor= gColors[i];
            contextGl.vertexAttrib3f(aPosition,cPoint[0],cPoint[1],0.0);
            contextGl.vertexAttrib3f(aPointSize,10.0);
            contextGl.uniform4f(uFragColor,cColor[0],cColor[1],cColor[2],cColor[3])
            contextGl.drawArrays(contextGl.OPTIONS,0,1)
        }
    }
   

    useEffect(()=>{
        init();
    },[]);

    useEffect(()=>{
        draw(gPoints,gColors)
    },[gPoints,gColors])



    

    return(
        <canvas ref={canvasRef} onClick={onClick} />
    )
}

export default ColorPoint



