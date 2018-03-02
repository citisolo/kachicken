import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Shell from './Components/Shell';
import LandingPage from './Components/LandingPage';
import SearchPage from './Components/SearchPage';
import MenuPage from './Components/MenuPage';
import { Provider } from 'react-redux';
import configureStore from './store/configStore';

import './index.css';
const store = configureStore(window.INITIAL_STATE);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Shell>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/search' component={SearchPage}/>
          <Route path={"/menu/:menuID"} component={MenuPage}/>
        </Switch>
      </Shell>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
