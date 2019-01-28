import HelloCanvas2d from "../example/HelloCanvas2d";
import { ReactNode } from 'react';

const routes:Array<routeType>=[
    {
        path:"helloCanvas2d",
        component:HelloCanvas2d
    }
]

interface routeType{
    path:string,
    component:ReactNode
}

export default routes