import * as React from "react";

const HelloCanvas4 = ()=>{
    const canvasRef:React.RefObject<any>= React.useRef(null);
    React.useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle='#FD0';
        ctx.fillRect(0,0,75,75);
        ctx.fillStyle = '#6C0';
        ctx.fillRect(75,0,75,75);
        ctx.fillStyle = '#09F';
        ctx.fillRect(0,75,75,75);
        ctx.fillStyle = '#F30';
        ctx.fillRect(75,75,75,75);
        ctx.fillStyle = '#FFF';
        ctx.globalAlpha = 0.2;
        for(let i=0;i<7;i++){
            ctx.beginPath();
            ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
            ctx.fill();
        }
    });
    return (<canvas ref={canvasRef}/>)
}

export default HelloCanvas4