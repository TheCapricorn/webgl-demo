import * as React from 'react';
import './App.css';
import helloCanvas2d from "./example/HelloCanvas2d"


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <canvas id="example"/>
      </div>
    );
  }

  componentDidMount(){
    helloCanvas2d();
  }
}

export default App;
