import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MenuItem.css';

class MenuItem extends Component {
  render(){
    return (
      <button type="button" className="btn btn-warning menu-entry-button">
        <span className="menu-item">{this.props.text}</span>
      </button>
    )
  }
}

// export class MenuItemList extends React.Component {
//      render(){
//        return(
//        <ul className="menu-item-list" >
//          {this.props.list.map(function(item){
//            <MenuItem text={item.text}></MenuItem>
//          })}
//        </ul>)
//      }
// }

export default MenuItem;
