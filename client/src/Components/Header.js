import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//import LoginComponent from './SubComponents/LoginComponent';

import './Header.css';

export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginToggled: false
    }

    this.toggleLogin = this.toggleLogin.bind(this);
    this.isToggled = this.isToggled.bind(this);
  }

  componentWillReceiveProps(props){
    console.log(this.props.loginComponent)
  }

  handleClick(event){
     console.log(event);
  }

  toggleLogin(){
    let toggle = !this.state.loginToggled
    this.setState({
      loginToggled: toggle
    })
  }

  isToggled(){
    return 'dropdown-menu ' + ((this.state.loginToggled) ? 'show': '')
  }

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <a className="navbar-brand" href="/"><i id="sitebrand" className="fas fa-chess-queen"></i></a>
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
          <div className="dropdown">
            <button className='btn btn-primary ' onClick={this.toggleLogin} data-offset="3" data-toggle="dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <i id="login-icon" className="fas fa-sign-in-alt"></i>
            </button>
            <div className={this.isToggled()}  aria-labelledby="dropdownMenuButton">
              {this.props.loginComponent}
              <div className="dropdown-divider"></div>
              <Link to='/register'>Sign up</Link>
              <a className="dropdown-item" href="#">Forgot password?</a>
            </div>
          </div>

        </div>
      </nav>
    )
  }

}

Header.propTypes = {
  loginComponent : PropTypes.object.isRequired,
}

export default Header;
