
 export default function main():void{
        // 获取canvas标签
        const canvas= document.getElementById("example");

        if(!canvas){
            console.log('Failed to retrieve the <canvas> element.');
            return;
        }

        const ctx =canvas.getContext("2d");
        ctx.fillStyle="red";
        ctx.fillRect(120,10,150,150);
}


