import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridList from './SubComponents/GridList';
import MenuCard, {DummyMenus as Menus} from './SubComponents/MenuCard';
import SubComponents from './SubComponents/MenuCard';
import { getMenus } from '../store/actions/mealplanner';
import { connect } from 'react-redux';


import './LandingPage.css';



// const mapDispatchToProps = (dispatch) => {
//
// }

class LandingPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      menuItems: []
    }
  }

  componentDidMount(){
    this.props.dispatch(getMenus());
  }
  render(){
    let menuItems =
        this.props.menuItems.map((item) => {
              return (
                <div>
                  <MenuCard image='/assets/img/menu.png'
                            altImage=""
                            menuID = {item.id}
                            title={item.name}
                            desc={item.description}
                            ></MenuCard>
                </div>)
              });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="jumbotron">
            <h1 className="display-4">Plan meals easy and effeciently</h1>
            <div className="row">
              <div className="col-4">
                <div className="card mkss-bubble-card" >
                  <div className="card-body">
                    <h5 className="card-title">Search recipes</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card mkss-bubble-card">
                  <div className="card-body">
                    <h5 className="card-title">Create a menu</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card mkss-bubble-card">
                  <div className="card-body">
                    <h5 className="card-title">Search menus</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
        <div className="row" >
         <GridList>
            {menuItems}
         </GridList>
        <div className="row" id="spa-shell-foot">
           <div className="col">
           </div>
        </div>
      </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.mealplanner.menus,
  }
}

export default connect(mapStateToProps)(LandingPage);
