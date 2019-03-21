import * as React from "react";

const HelloCanvas5=()=>{
    const canvasRef:React.RefObject<any> = React.useRef(null);
    React.useEffect(()=>{
        const ctx=canvasRef.current.getContext('2d');
        const lineCaps=['butt','round','square'];
        ctx.strokeStyle='#09F';
        ctx.beginPath();
        ctx.moveTo(10,10);
        ctx.lineTo(140,10);
        ctx.moveTo(10,140);
        ctx.lineTo(140,140);
        ctx.stroke();
        ctx.strokeStyle='black';
        for(let i=0;i<lineCaps.length;i++){
            ctx.lineWidth=15;
            ctx.lineCap=lineCaps[i];
            ctx.beginPath();
            ctx.moveTo(25+i*50,10);
            ctx.lineTo(25+i*50,140);
            ctx.stroke();
        }
    })
    return (<canvas ref={canvasRef} />)
}

export default HelloCanvas5