import * as React from "react";
const {useRef}=React;
const MultiAttributeSizeInterLeaved=()=>{
    const canvasRef=useRef(null);
    return(
        <canvas ref={canvasRef} />
    )
}


export default MultiAttributeSizeInterLeaved