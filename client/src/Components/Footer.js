import React, { Component } from 'react';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ul className=" footer">
        <li className="nav-item">
          <a className="nav-link" href="#">contact</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">about</a>
        </li>
      </ul>
    )
  }

}

export default Footer;
