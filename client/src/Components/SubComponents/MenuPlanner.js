import React, { Component } from 'react';
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import { getMenu, getRecipe } from '../../store/actions/mealplanner';
import PropTypes from 'prop-types';
import {MenuFormatter} from 'menu-planner-utils';


import './MenuPlanner.css';

class MenuCell extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes:[],
    }

  }

  componentWillReceiveProps(props){
    let list = [];
    props.recipes.map((id, index) => {
      getRecipe(id)((action) => {
        list.push(action.payload);
        if(index === (props.recipes.length - 1)){
          this.setState({
            recipes: list
          })
        }
      })
    });
  }

  componentDidMount(){
  }

  render(){
    let items = this.state.recipes.map((item, index) => {
        if(item === null){
          item = {};
          item.name="Null";
        }
        return (<MenuItem key={index} text={item.name}> </MenuItem>)
      })

    return (
      <div className="menu-cell">
        {items}
      </div>
    )
  }
}

class MenuPlanner extends Component {

  constructor(props){
    super(props);

    this.state = {
      menu:{
        breakfast: { monday: ["dummy"], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
      },
      selectedMenu: {
        menu:{
          breakfast: { monday: ["dummy"], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
        },
        menuFormat: {
          row:[],
          col:[],
          recipe: []
        }
      }
    }
  }

  componentWillReceiveProps(props){

  }

  componentDidMount(){
     this.props.dispatch(getMenu(this.props.menuID));
  }

  renderCell(row, col, val){
     let pos = {row, col};
     return (<MenuCell position={pos} recipes={val}></MenuCell>)
  }

  render(){
    this.state = {
      selectedMenu: this.props.selectedMenu,
      menu: MenuFormatter.decode(this.props.menuFormat)
    }

    return(
      <div id="menu-calendar">
        <table className="menu-table">
        <tbody>
        <tr>
           <th id="menu-label-header"></th>
           <th>Monday</th>
           <th>Tuesday</th>
           <th>Wednesday</th>
           <th>Thursday</th>
           <th>Friday</th>
           <th>Saturday</th>
           <th>Sunday</th>
        </tr>
        <tr>
           <td><span className="menu-label">Breakfast</span></td>
           <td>{this.renderCell(0, 0, this.state.menu.breakfast.monday)}</td>
           <td>{this.renderCell(0, 1, this.state.menu.breakfast.tuesday)}</td>
           <td>{this.renderCell(0, 2, this.state.menu.breakfast.wednesday)}</td>
           <td>{this.renderCell(0, 3, this.state.menu.breakfast.thursday)}</td>
           <td>{this.renderCell(0, 4, this.state.menu.breakfast.friday)}</td>
           <td>{this.renderCell(0, 5, this.state.menu.breakfast.saturday)}</td>
           <td>{this.renderCell(0, 6, this.state.menu.breakfast.sunday)}</td>
        </tr>
        <tr>
           <td><span className="menu-label">Lunch</span></td>
           <td>{this.renderCell(1, 0, this.state.menu.lunch.monday)}</td>
           <td>{this.renderCell(1, 1, this.state.menu.lunch.tuesday)}</td>
           <td>{this.renderCell(1, 2, this.state.menu.lunch.wednesday)}</td>
           <td>{this.renderCell(1, 3, this.state.menu.lunch.thursday)}</td>
           <td>{this.renderCell(1, 4, this.state.menu.lunch.friday)}</td>
           <td>{this.renderCell(1, 5, this.state.menu.lunch.saturday)}</td>
           <td>{this.renderCell(1, 6, this.state.menu.lunch.sunday)}</td>
        </tr>
        <tr>
           <td><span className="menu-label">Snack</span></td>
           <td>{this.renderCell(2, 0, this.state.menu.snack.monday)}</td>
           <td>{this.renderCell(2, 1, this.state.menu.snack.tuesday)}</td>
           <td>{this.renderCell(2, 2, this.state.menu.snack.wednesday)}</td>
           <td>{this.renderCell(2, 3, this.state.menu.snack.thursday)}</td>
           <td>{this.renderCell(2, 4, this.state.menu.snack.friday)}</td>
           <td>{this.renderCell(2, 5, this.state.menu.snack.saturday)}</td>
           <td>{this.renderCell(2, 6, this.state.menu.snack.sunday)}</td>
        </tr>
        <tr>
           <td><span className="menu-label">Dinner</span></td>
           <td>{this.renderCell(3, 0, this.state.menu.dinner.monday)}</td>
           <td>{this.renderCell(3, 1, this.state.menu.dinner.tuesday)}</td>
           <td>{this.renderCell(3, 2, this.state.menu.dinner.wednesday)}</td>
           <td>{this.renderCell(3, 3, this.state.menu.dinner.thursday)}</td>
           <td>{this.renderCell(3, 4, this.state.menu.dinner.friday)}</td>
           <td>{this.renderCell(3, 5, this.state.menu.dinner.saturday)}</td>
           <td>{this.renderCell(3, 6, this.state.menu.dinner.sunday)}</td>
        </tr>
         <tr>
           <td><span className="menu-label">Dessert</span></td>
           <td>{this.renderCell(4, 0, this.state.menu.pudding.monday)}</td>
           <td>{this.renderCell(4, 1, this.state.menu.pudding.tuesday)}</td>
           <td>{this.renderCell(4, 2, this.state.menu.pudding.wednesday)}</td>
           <td>{this.renderCell(4, 3, this.state.menu.pudding.thursday)}</td>
           <td>{this.renderCell(4, 4, this.state.menu.pudding.friday)}</td>
           <td>{this.renderCell(4, 5, this.state.menu.pudding.saturday)}</td>
           <td>{this.renderCell(4, 6, this.state.menu.pudding.sunday)}</td>
        </tr>
        </tbody>
       </table>
      </div>
    )
  }
}

MenuPlanner.propTypes = {
  menuID: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    selectedMenu: state.mealplanner.selectedMenu,
    menuFormat: state.mealplanner.selectedMenu.menuFormat
  };
};

export default connect(mapStateToProps)(MenuPlanner);
