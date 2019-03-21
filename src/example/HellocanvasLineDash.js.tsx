import * as React from "react";


const HellocanvasLineDash=()=>{
    const canvasRef:React.RefObject<any>= React.useRef(null);
    const [offset,setOffset]= React.useState(0);
    const draw=React.useCallback(()=>{
        const ctx=canvasRef.current.getContext('2d');
        ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        ctx.setLineDash([4,1]);
        ctx.lineDashOffset=-offset;
        ctx.strokeRect(10,10,100,100);
    },[]);
    const march=React.useCallback(()=>{
        setOffset((prev)=>{
            let current =prev+1;
            if (current > 16) {
                current = 0;
              }
            draw()
            return current
        });

    },[offset])

    React.useEffect(()=>{
        march();

    });
    
    return (<canvas ref={canvasRef}/>)
}

export default HellocanvasLineDash