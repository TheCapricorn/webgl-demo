import HelloCanvas2d from "../example/HelloCanvas2d";
import HelloCanvas from "../example/HelloCanvas";
import HelloCanvas1 from "../example/HelloCanvas1";
import HelloCanvas2 from "../example/HelloCanvas2";
import HelloCanvas3 from "../example/HelloCanvas3";
import HelloCanvas4 from "../example/HelloCanvas4";
import HelloCanvas5 from "../example/HelloCanvas5";
import HelloCanvasLineJoin from "../example/HelloCanvasLineJoin";
import HellocanvasLineDash from "../example/HellocanvasLineDash.js";
import HelloCanvasGradient from "../example/HelloCanvasGradient";
import HelloCanvasRadialGradient from "../example/HelloCanvasRadialGradient";
import HelloPoint from "../example/HelloPoint";
import DynamicHelloPoint from "@/example/DynamicHelloPoint";
import  ColoredPoint from "@/example/ColoredPoint";
import HelloTriangle from "@/example/HelloTriangle";
import HelloTranslateTriangle from "@/example/HelloTranslateTriangle";
import HelloRotateTriangle from "@/example/HelloRotateTriangle";
import HelloTranslateMat4 from "@/example/HelloTranslateMat4";
import RotatingTranslate from "@/example/RotatingTranslate";
import MultiAttributeColor from "@/example/MultiAttributeColor"
import MultiAttributeSizeInterLeaved from "@/example/MultiAttributeSizeInterLeaved";
import TexturedQuad from "@/example/TexturedQuad";
import LookAtTriangles from "@/example/LookAtTriangles";
import LookAtRotateTriangles from "@/example/LookAtRotateTriangles";
import LookAtTrianglesWithKey from "@/example/LookAtTrianglesWithKey";
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
        path:"/helloCanvas1",
        component:HelloCanvas1,
        name:"helloCanvas1",
    },
    {
        path:"/helloCanvas2",
        component:HelloCanvas2,
        name:"helloCanvas2",
    },
    {
        path:"/HelloCanvas3",
        component:HelloCanvas3,
        name:"HelloCanvas3",
    },
    {
        path:"/HelloCanvas4",
        component:HelloCanvas4,
        name:"HelloCanvas4",
    },
    {
        path:"/HelloCanvas5",
        component:HelloCanvas5,
        name:"HelloCanvas5",
    },
    {
        path:"/HelloCanvasLineJoin",
        component:HelloCanvasLineJoin,
        name:"HelloCanvasLineJoin",
    },
    {
        path:"/HellocanvasLineDash",
        component:HellocanvasLineDash,
        name:"HellocanvasLineDash",
    },
    {
        path:"/HelloCanvasGradient",
        component:HelloCanvasGradient,
        name:"HelloCanvasGradient",
    },
    {
        path:"/HelloCanvasRadialGradient",
        component:HelloCanvasRadialGradient,
        name:"HelloCanvasRadialGradient",
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
    {
        path:"/MultiAttributeColor",
        component:MultiAttributeColor,
        name:"MultiAttributeColor",
    },
    {
        path:"/TexturedQuad",
        component:TexturedQuad,
        name:"TexturedQuad",
    },
    {
        path:"/LookAtTriangles",
        component:LookAtTriangles,
        name:"LookAtTriangles",
    },
    {
        path:"/LookAtRotateTriangles",
        component:LookAtRotateTriangles,
        name:"LookAtRotateTriangles",
    },
    {
        path:"/LookAtTrianglesWithKey",
        component:LookAtTrianglesWithKey,
        name:"LookAtTrianglesWithKey",
    },
]


export interface routeType{
    path:string,
    name:string,
    component:React.ComponentClass | React.SFCElement<any>,
}




export default routes