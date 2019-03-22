import * as React from "react";

const HelloCanvasGradient =()=>{
    const canvasRef:React.RefObject<any> = React.useRef(null);

    React.useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        const lingrad = ctx.createLinearGradient(0,0,0,150);
        const lingrad2 = ctx.createLinearGradient(0,50,0,95);
        lingrad.addColorStop(0, '#00ABEB');
        lingrad.addColorStop(0.5, '#fff');
        lingrad.addColorStop(0.5, '#26C000');
        lingrad.addColorStop(1, '#fff');
        lingrad2.addColorStop(0.5, '#000');
        lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle=lingrad;
        ctx.strokeStyle=lingrad2;
        ctx.fillRect(10,10,130,130);
        ctx.strokeRect(50,50,50,50);

    });
    return (<canvas ref={canvasRef}/>)
}


export default HelloCanvasGradient