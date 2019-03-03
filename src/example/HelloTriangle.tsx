import * as React from  'react';
import {getWebGLContext,initShaders} from "lib/cuon-utils";

const {useEffect,useRef} = React;
const canvasRef= useRef(null);
const VSHADER_SOURCE=
        '';
const FSHADER_SOURCE=
        '';
const initVertexBuffers=()=>{
    const n=3;



    return n;
}

const HelloTriangle = ()=>{
    useEffect(()=>{
        const gl:any= getWebGLContext(canvasRef.current,true);
        if(!gl){
            return;
        }

        if(!initShaders(gl.program,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }

        if(initVertexBuffers()<0){
            return;
        }


    })
    return (<canvas ref={canvasRef} />)
}

export default HelloTriangle