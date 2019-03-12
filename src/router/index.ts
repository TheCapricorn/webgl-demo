import HelloCanvas2d from "../example/HelloCanvas2d";
import HelloCanvas from "../example/HelloCanvas";
import HelloPoint from "../example/HelloPoint";
import DynamicHelloPoint from "@/example/DynamicHelloPoint";
import  ColoredPoint from "@/example/ColoredPoint";
import HelloTriangle from "@/example/HelloTriangle";
import HelloTranslateTriangle from "@/example/HelloTranslateTriangle";
import HelloRotateTriangle from "@/example/HelloRotateTriangle";
import HelloTranslateMat4 from "@/example/HelloTranslateMat4";
import RotatingTranslate from "@/example/RotatingTranslate";
import MultiAttributeSizeInterLeaved from "@/example/MultiAttributeSizeInterLeaved";
import * as React from "react";

const routes:Array<any>=[
    {
        path:"/helloCanvas2d",
        component:HelloCanvas2d,
        name:"HelloCanvas2d",
    },
    {
        path:"/helloCanvas",
        component:HelloCanvas,
        name:"helloCanvas",
    },
    {
        path:"/helloPoint",
        component:HelloPoint,
        name:"HelloPoint",
    },
    {
        path:"/DynamicHelloPoint",
        component:DynamicHelloPoint,
        name:"DynamicHelloPoint",
    },
    {
        path:"/ColoredPoint",
        component:ColoredPoint,
        name:"ColoredPoint",
    },
    {
        path:"/HelloTriangle",
        component:HelloTriangle,
        name:"HelloTriangle",
    },
    {
        path:"/HelloTranslateTriangle",
        component:HelloTranslateTriangle,
        name:"HelloTranslateTriangle",
    },
    {
        path:"/HelloRotateTriangle",
        component:HelloRotateTriangle,
        name:"HelloRotateTriangle",
    },
    {
        path:"/HelloTranslateMat4",
        component:HelloTranslateMat4,
        name:"HelloTranslateMat4",
    },
    {
        path:"/RotatingTranslate",
        component:RotatingTranslate,
        name:"RotatingTranslate",
    },
    {
        path:"/MultiAttributeSizeInterLeaved",
        component:MultiAttributeSizeInterLeaved,
        name:"MultiAttributeSizeInterLeaved",
    },
]

export interface routeType{
    path:string,
    name:string,
    component:React.ComponentClass | React.SFCElement<any>,
}




export default routes