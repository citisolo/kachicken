import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FlexLayout.css';

class FlexLayout extends Component {
  render(){
    return(
      <div id="menu-container" className="flex-container" >
        <div id="menu-sidebar">
          {this.props.children[0]}
        </div>
        <div id="menu-calendar">
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}

export default FlexLayout;
