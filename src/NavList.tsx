import * as React from "react";
import {Link} from "react-router-dom";
import {routeType} from "./router"
const {Fragment} =React;
const NavList:NavList =({routes})=>{
    console.log(routes)
    return(
        <Fragment>
            {
                routes.map(({path,name},i)=>{
                return(
                <Link key={i} to={path}>{name}</Link>
                )
            })
            }
        </Fragment>
       
    )
}



type NavList =(P:{routes:Array<routeType>})=>React.ReactElement<any>


export default NavList


