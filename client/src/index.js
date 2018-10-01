import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker, {unregister} from './registerServiceWorker';
import App from './App';
import { AppContainer } from 'react-hot-loader';

import './index.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>
  , document.getElementById('root'));
}

registerServiceWorker();
//unregister();

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  })
}
