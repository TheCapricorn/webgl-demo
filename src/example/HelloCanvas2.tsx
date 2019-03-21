import * as React from "react";

const HelloCanvas2=()=>{
    const canvasRef:React.RefObject<any> = React.useRef(null);
    React.useEffect(()=>{
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                ctx.fillStyle=`rgb(0,${Math.floor(42.5*i)},${Math.floor(42.5*j)})`
                ctx.fillRect(i*25,j*25,25,25);
            }
        }
    })
    return(<canvas ref={canvasRef} />)
}

export default HelloCanvas2