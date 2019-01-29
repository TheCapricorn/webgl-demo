import * as React from 'react';
import {Route,BrowserRouter as Router} from "react-router-dom";
import './App.css';
import NavList from "./NavList"
import  routes from "./router";

const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props}/>
  )}/>
)







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
          <FadingRoute path="/" routes={routes}  component={NavList} />
        </div>
      
      </Router>
    );
  }

  componentDidMount(){
  
  }
}

export default App;
