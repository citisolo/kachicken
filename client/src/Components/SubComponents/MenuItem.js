import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MenuItem.css';
//<span class="badge badge-default">new</span>
class MenuItem extends Component {
  render(){
    return (
      <div className="btn-group-vertical">
       <button type="button" className="btn btn-warning menu-entry-button">
         <span className="menu-item">{this.props.text}</span>
       </button>
       <button type="button" onClick={(e) => {this.props.remove(this.props.index)}} className="menu-item-utility-button btn btn-warning"><span className="menu-item-utility-button-badge badge badge-default"><i class="fas fa-minus-circle"></i></span></button>
      </div>
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
