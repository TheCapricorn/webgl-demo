import * as React from 'react';
import {Route,HashRouter as Router} from "react-router-dom";
import './App.css';
import NavList from "./NavList"
import  routes from "./router";



/* const FadingRoute = ({ component: Component, ...rest }:{component:any,path:string,routes:object[]}) =>{
  const renders=(props:object) =>{
    return(
      <Component {...rest }/>
    )
  }
  return(
    <Route {...rest} render={renders}/>
  )

} */

//type FadingRoute=(props:{component:RouterChildContext,path:string,routes:Array<object>})=>React.ReactElement<object>

const render=()=>(<NavList routes={routes}/>)




class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          {
            routes.map(({path,component},i)=>{
              return(
                <Route key={i} path={path}  component={component} />
              )
            })
          }
          <Route path="/" exact={true} render={render}/>
        </div>
      
      </Router>
    );
  }

  componentDidMount(){
  
  }
}

export default App;
