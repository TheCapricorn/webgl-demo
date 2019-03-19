import * as React from "react";


const HelloCanvas1=()=>{
    const canvasRef:React.RefObject<any>= React.useRef(null);
    const draw = React.useCallback((ctx)=>{
        for(let i=0;i<4;i++){
            for(let j=0;j<3;j++){
                ctx.beginPath();
                const x=25+j*50;
                const y=25+i*50;
                const radius=20,startAngle=0,endAngle=Math.PI+(Math.PI*j)/2;
                const anticlockwise = i%2==0 ? false :true;
                ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
                if(i>1){
                    ctx.fill();
                }else{
                    ctx.stroke();
                }
            }
        }
    },[]);

    React.useEffect(()=>{
        const ctx:HTMLCanvasElement= canvasRef.current.getContext('2d');
        draw(ctx);
    })

    return (<canvas ref={canvasRef} />)
}



export default HelloCanvas1