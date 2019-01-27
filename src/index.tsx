import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader'; // 包裹根节点，想要渲染的内容
const root=document.getElementById('root') ;
const render = (Component:any)  => {

  ReactDOM.hydrate(
      <AppContainer>
          <Component />
      </AppContainer>,
      root
  )
}
render(App);
/* ReactDOM.render(
  <App />,
  root as HTMLElement
); */



if (module.hot) {
  module.hot.accept('./App', () => { // 当我们热更新的代码出现的时候，把App重新加载
      const NextApp = require('./App').default //因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上
      render(NextApp) // 重新渲染到 document 里面
  })
}
registerServiceWorker();
