import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Shell from './Shell';
import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import { Provider } from 'react-redux';

import './Home.css';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <BrowserRouter>
        <Shell>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/search' component={SearchPage}/>
          </Switch>
        </Shell>
      </BrowserRouter>
    )
  }
}

export default Home;
