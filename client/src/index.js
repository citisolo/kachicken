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
import LoginComponent from './Components/SubComponents/LoginComponent';
import Register from './Components/Register';

import './index.css';

const store = configureStore({localstorage: localStorage, windowObject: window});
const loginComponent = <LoginComponent/>;

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Shell loginComponent={loginComponent}>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/search' component={SearchPage}/>
          <Route path={"/menu/:menuID"} component={MenuPage}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </Shell>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
