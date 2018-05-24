import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexLayout from './SubComponents/FlexLayout';
import MenuPlanner from './SubComponents/MenuPlanner';
import { connect } from 'react-redux';


import './MenuPage.css';


export class MenuPage extends Component {

  render(){
    // console.log(this.props.match.params);
    return (
      <FlexLayout>
       <div>
        <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              Recipes
            </a>
            <a href="#" className="list-group-item list-group-item-action">Saved Recipes</a>
            <a href="#" className="list-group-item list-group-item-action">Low Carb Recipes</a>
            <a href="#" className="list-group-item list-group-item-action">Social</a>
            <a href="#" className="list-group-item list-group-item-action disabled">Other stuff</a>
          </div>
        </div>
       <MenuPlanner menuID={this.props.match.params.menuID}/>
      </FlexLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // state: state.mealplanner.menus,
    localStorage: state.localStorage
  }
}

export default connect(mapStateToProps)(MenuPage);
