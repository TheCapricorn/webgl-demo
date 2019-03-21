import * as React from  "react";

const HelloCanvasLineJoin=()=>{
    const canvasRef:React.RefObject<any>= React.useRef(null);
    React.useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        const lineJoins=['round', 'bevel', 'miter'];
        ctx.strokeStyle='black';
        ctx.lineWidth=10;
        for(let i=0;i<lineJoins.length;i++){
            ctx.lineJoin=lineJoins[i];
            ctx.beginPath();
            ctx.moveTo(-5, 5 + i * 40);
            ctx.lineTo(35, 45 + i * 40);
            ctx.lineTo(75, 5 + i * 40);
            ctx.lineTo(115, 45 + i * 40);
            ctx.lineTo(155, 5 + i * 40);
            ctx.stroke();
        }
    });
    return (<canvas ref={canvasRef}/>)
}

export default HelloCanvasLineJoin