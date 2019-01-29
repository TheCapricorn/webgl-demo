import HelloCanvas2d from "../example/HelloCanvas2d";
import * as React from "react";

const routes:Array<routeType>=[
    {
        path:"/helloCanvas2d",
        component:HelloCanvas2d,
        name:"HelloCanvas2d",
    }
]

export interface routeType{
    path:string,
    name:string,
    component:React.ComponentClass,
}




export default routes