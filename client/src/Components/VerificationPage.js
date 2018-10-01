import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexLayout from './SubComponents/FlexLayout';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


import './MenuPage.css';


export class VerificationPage extends Component {

  render(){
    // console.log(this.props.match.params);

    return (
       <div>
         <h1> Registration verified successfully</h1>
         <p>You are now ready to <Link to="">Log In </Link></p>
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // state: state.mealplanner.menus,
    localStorage: state.localStorage,
    user : state.auth
  }
}

export default connect(mapStateToProps)(VerificationPage);
