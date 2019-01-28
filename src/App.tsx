import * as React from 'react';
import {Route,BrowserRouter as Router} from "react-router-dom";
import './App.css';
import  routes from "./router";

class App extends React.Component {
  public render() {
    return (
      <Router>
        
        {
          routes.map(({path,component},i)=>{
            return(
              <Route key={i} path={path}  component={component}/>
            )
          })
        }
      </Router>
    );
  }

  componentDidMount(){
  
  }
}

export default App;
