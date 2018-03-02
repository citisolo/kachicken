import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexLayout from './SubComponents/FlexLayout';
import MenuPlanner from './SubComponents/MenuPlanner';
import { connect } from 'react-redux';


// import './LandingPage.css';


class MenuPage extends Component {
  render(){
    return (
      <FlexLayout>
       <div></div>
       <MenuPlanner menuID={this.props.match.params.menuID}/>
      </FlexLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.mealplanner.menus,
  }
}

export default connect(mapStateToProps)(MenuPage);
