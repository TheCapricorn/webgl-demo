import * as React from "react";
const {useRef,useEffect} = React;
const VSHADER_SOURCE:string = 
        'attribute vec4 a_Position;\n'+
        'attribute vec4 a_Color;\n'+
        'uniform mat4 u_ViewMatrix;\n'+
        'uniform mat4 u_ModelMatrix;\n'+
        'varying vec4 v_Color;\n'+
        'void main(){\n'+
                'gl_Position = u_ViewMatrix*u_ModelMatrix*a_Position;\n'+
                'gl_PointSize = 10.0;\n'+
                'v_Color = a_Color;\n'+
        '}\n';
const FSHADER_SOURCE:string =
        'precision mediump float;\n' +//!!! 需要声明浮点数精度，否则报错No precision specified for (float)
        'varying vec4 v_Color;\n'+
        'void main(){/n'+
                'gl_FragColor = v_Color;\n'+
        '}\n';

function main(canvas:React.RefObject<any>):void{
        if (!canvas) {
                console.log("Failed to retrieve the <canvas> element");
                return;
        }

        
}      

const LookAtRotateTriangles = ()=>{
        const canvasRef:React.RefObject<any> = useRef(null);
        useEffect(()=>{
                main(canvasRef.current)
        },[])
        return (
                <canvas ref={canvasRef} />
        )
}

export default LookAtRotateTriangles

                 
 