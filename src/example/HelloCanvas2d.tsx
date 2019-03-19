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
        /*    ctx.fillStyle='red';
           ctx.fillRect(100,25,100,100);
           ctx.clearRect(150-10,75-10,20,20);  
           ctx.strokeRect(145,75-5,10,10);  
           ctx.beginPath();
           ctx.moveTo(10,10);
           ctx.lineTo(20,20);
           ctx.lineTo(30,10);
           ctx.fill(); */
/* 
           // 填充三角形
            ctx.beginPath();
            ctx.moveTo(25,25);
            ctx.lineTo(105,25);
            ctx.lineTo(25,105);
            ctx.fill();

            // 描边三角形
            ctx.beginPath();
            ctx.moveTo(125,125);
            ctx.lineTo(125,45);
            ctx.lineTo(45,125);
            ctx.closePath();
            ctx.stroke(); */
           ctx.beginPath();
           ctx.arc(75,75,50,0,Math.PI*2,true);
           ctx.moveTo(110,75);
           ctx.arc(75,75,35,0,Math.PI,false); 
           ctx.moveTo(65,65);
           ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
           ctx.moveTo(95,65);
           ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
           ctx.stroke();
    }

}




