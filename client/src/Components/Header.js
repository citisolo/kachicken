import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <a className="navbar-brand" href="#"><i id="sitebrand" className="fas fa-chess-queen"></i></a>
        <span><h1 id="logo-title">Kachicken</h1></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">Search</a>
            </li>
          </ul>
          <i id="login-icon" className="fas fa-sign-in-alt"></i>
        </div>
      </nav>
    )
  }

}

export default Header;
