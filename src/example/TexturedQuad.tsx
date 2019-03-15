import * as React from "react";
import {getWebGLContext,initShaders} from "lib/cuon-utils";
const {useRef,useEffect} = React;

const SHADER_SOURCE=
'attribute vec4 a_Position;\n'+
'attribute vec2 a_TextCord;\n'+
'varying vec2 v_TextCord;\n'+
''
;
const FSHADER_SOURCE=
'';

const TexturedQuad=()=>{
    const canvasRef=useRef(null);
    useEffect(()=>{
        const gl:any=getWebGLContext(canvasRef.current,true);
        if(!initShaders(gl,SHADER_SOURCE,FSHADER_SOURCE)){
            return;
        }
        

    })
    return (<canvas ref={canvasRef} />)
    
}

export default TexturedQuad