import * as React from "react";

const HelloCanvasRadialGradient=()=>{
    const canvasRef:React.RefObject<any>= React.useRef(null);
    React.useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        const radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
        radgrad.addColorStop(0, '#A7D30C');
        radgrad.addColorStop(0.9, '#019F62');
        radgrad.addColorStop(1, 'rgba(1,159,98,0)');
        ctx.fillStyle = radgrad;
        ctx.fillRect(0,0,150,150);
    });
    return (
        <canvas ref={canvasRef}  />
    )
}

export default HelloCanvasRadialGradient
