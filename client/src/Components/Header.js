import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <a class="navbar-brand" href="#"><i id="sitebrand" class="fas fa-chess-queen"></i></a>
        <span><h1 id="logo-title">Kachicken</h1></span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/search">Search</a>
            </li>
          </ul>
          <i id="login-icon" class="fas fa-sign-in-alt"></i>
        </div>
      </nav>
    )
  }

}

export default Header;
