import * as React from "react";
//import {routeType} from "./router";
import { withRouter } from 'react-router';

const {Fragment} =React;

const NavList =({routes,history}:any)=>{
    console.log(routes);

    return(
        <Fragment>
            {
                routes.map(({path,name}:any,i:number)=>{
                    //console.info(history)
                const go=(e:any)=>{
                    e.preventDefault();
                    history.push(path);

                }    
                return(
                <a key={i} onClick={go}>{name}</a>
                )
            })            
            }
        </Fragment>
       
    )
}



//type NavList =(P:{routes:Array<routeType>})=>React.ReactElement<any>


export default  withRouter(NavList)


