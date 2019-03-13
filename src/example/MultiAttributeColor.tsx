import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const {useEffect,useRef}= React;
const VSHADER_SOURCE='';
const FSHADER_SOURCE='';
const MultiAttributeColor=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }

    });
    return(<canvas ref={canvasRef} />)
}


export default MultiAttributeColor