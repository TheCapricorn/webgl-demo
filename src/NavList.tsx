import * as React from "react";
//import {routeType} from "./router";
import { withRouter } from 'react-router';

const {Fragment} =React;

const NavList =({routes,history}:any)=>{
    console.log(routes,1111);

    return(
        <Fragment>
            <ul>
            {
                routes.map(({path,name}:any,i:number)=>{
                    //console.info(history)
                const go=(e:any)=>{
                    e.preventDefault();
                    history.push(path);

                }    
                return(
                    <li key={i}><a  onClick={go}>{name}</a></li>
                )
            })            
            }
            </ul>
        </Fragment>
       
    )
}



//type NavList =(P:{routes:Array<routeType>})=>React.ReactElement<any>


export default  withRouter(NavList)


