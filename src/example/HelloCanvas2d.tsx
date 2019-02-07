import * as React from "react";

interface HelloProps{

}


export default class HelloCanvas2d extends React.PureComponent<HelloProps,{}>{
    setCanvas2d=(e:any)=>{
        this.canvas2dEle=e;
    }
    canvas2dEle=undefined
    render():JSX.Element{
        
        return(
            <div className="App">
                <canvas ref={this.setCanvas2d} id="example"/>
            </div>
        )
    }

    componentDidMount(){
           const canvas2d = this.canvas2dEle as HTMLCanvasElement | any;
           
           if(!canvas2d){
               return;
           }
           const ctx = canvas2d.getContext('2d') ;
           ctx.fillStyle='red';
           ctx.fillRect(100,100,100,100);
            
    }

}




