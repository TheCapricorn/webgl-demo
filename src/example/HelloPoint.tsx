import * as React from  'react';
import {getWebGLContext, initShaders} from "lib/cuon-utils";
const {useEffect} =React;

const VSHADER_SOURCE=
    'void main(){\n'+
    'gl_Position=vec4(0.0,0.0,0.0,1.0);\n'+
    'gl_PointSize=10.0;\n'+
    '}';
const FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,0.0);\n'+
    '}'


const HelloPoint=()=>{

    useEffect(()=>{
        const webgl=document.getElementById('webgl');
        const gl= getWebGLContext(webgl,true);

        if(!gl){
            console.log('Faild to get the rendering context for WebGL');
            return;
        }

        initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
        gl.clearColor(0.0,0.0,0.0,1.0);//清空绘图区域
        gl.clear(gl.COLOR_BUFFER_BIT);// 清空缓冲区域
        gl.drawArrays(gl.POINTS,0,1);

    })
    return(
        <canvas  id='webgl' />
    )
}

/* 
 interface HelloPointState{
    count:number
 } */

 /* class HelloPoint extends React.Component<{},HelloPointState>{
     state={
         count:0,
     }

     countClick=()=>{
        this.setState(({count})=>{
            return {count:++count}
        })
    }

     render(){
        console.log('render',this.state.count)
         return(

             <div onClick={this.countClick}><button>count</button></div>
         )
     }

     shouldComponentUpdate(nextProps:object,nextState:HelloPointState){
         console.log('shouldComponentUpdate',nextState.count)
         return true;
     }

     componentWillUpdate(nextProps:object,nextState:HelloPointState){
            console.log('componentWillUpdate',nextState.count)
     }

     componentDidUpdate(prevProps:object,prevState:HelloPointState){
        console.log('componentDidUpdate',prevState.count)
     }
 }
 */
export default HelloPoint