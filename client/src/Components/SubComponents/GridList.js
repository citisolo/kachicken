import React, { Component } from 'react';
import MenuCard from './MenuCard';
import PropTypes from 'prop-types';
import './GridList.css';

class GridList extends Component {
  render(){
    return (
      <div class="mkss-grid-list">
        {this.props.children}
      </div>
    )
  }
}

// GridList.propTypes = {
//   list: PropTypes.array.isRequired
// }

export default GridList;
