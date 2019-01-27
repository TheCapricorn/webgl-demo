
 export default function main():void{
        // 获取canvas标签
        const canvas:HTMLCanvasElement=  document.getElementById("example") as HTMLCanvasElement;

        if(!canvas){
            console.log('Failed to retrieve the <canvas> element.');
            return;
        }

        const ctx:CanvasRenderingContext2D=canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.fillStyle="red";
        ctx.fillRect(120,10,150,150);
}


