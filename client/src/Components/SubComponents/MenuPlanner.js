import React, { Component } from 'react';
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import { getMenu } from '../../store/actions/mealplanner';
import PropTypes from 'prop-types';


import './MenuPlanner.css';

class MenuCell extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   list:[],
    // }
  }

  render(){
    if(this.props.recipes.length > 0) {
      console.log(this.props.recipes);
    }
    let items = this.props.recipes.map((item, index) => {
        if(item === null){
          item = {};
          item.name="Null";
        }
        return (<MenuItem key={index} text={item.name}> </MenuItem>)
      })

    return (

      <div class="menu-cell">
        {items}
      </div>
    )
  }
}

class MenuPlanner extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedMenu: {
        dummy: true,
        menu:{
          breakfast: { monday: ["dummy"], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
          pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
        }
      }
    }
  }

  componentDidMount(){
     this.props.dispatch(getMenu(this.props.menuID));
    //  console.log("selectedMenu");
    //  console.log(this.props.selectedMenu);
     this.setState({
       selectedMenu: this.props.selectedMenu
     })
  }

  renderCell(row, col, val){

     let pos = {row, col};
     return (<MenuCell position={pos} recipes={val}></MenuCell>)
  }

  render(){
    // console.log(this.props.selectedMenu);
    this.state = {
      selectedMenu: this.props.selectedMenu
    }
    return(
      <div id="menu-calendar">
        <table class="menu-table"  cellspacing="0">
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
           <td><span class="menu-label">Breakfast</span></td>
           <td>{this.renderCell(0, 0, this.state.selectedMenu.menu.breakfast.monday)}</td>
           <td>{this.renderCell(0, 1, this.state.selectedMenu.menu.breakfast.tuesday)}</td>
           <td>{this.renderCell(0, 2, this.state.selectedMenu.menu.breakfast.wednesday)}</td>
           <td>{this.renderCell(0, 3, this.state.selectedMenu.menu.breakfast.thursday)}</td>
           <td>{this.renderCell(0, 4, this.state.selectedMenu.menu.breakfast.friday)}</td>
           <td>{this.renderCell(0, 5, this.state.selectedMenu.menu.breakfast.saturday)}</td>
           <td>{this.renderCell(0, 6, this.state.selectedMenu.menu.breakfast.sunday)}</td>
        </tr>
        <tr>
           <td><span class="menu-label">Lunch</span></td>
           <td>{this.renderCell(1, 0, this.state.selectedMenu.menu.lunch.monday)}</td>
           <td>{this.renderCell(1, 1, this.state.selectedMenu.menu.lunch.tuesday)}</td>
           <td>{this.renderCell(1, 2, this.state.selectedMenu.menu.lunch.wednesday)}</td>
           <td>{this.renderCell(1, 3, this.state.selectedMenu.menu.lunch.thursday)}</td>
           <td>{this.renderCell(1, 4, this.state.selectedMenu.menu.lunch.friday)}</td>
           <td>{this.renderCell(1, 5, this.state.selectedMenu.menu.lunch.saturday)}</td>
           <td>{this.renderCell(1, 6, this.state.selectedMenu.menu.lunch.sunday)}</td>
        </tr>
        <tr>
           <td><span class="menu-label">Snack</span></td>
           <td>{this.renderCell(2, 0, this.state.selectedMenu.menu.snack.monday)}</td>
           <td>{this.renderCell(2, 1, this.state.selectedMenu.menu.snack.tuesday)}</td>
           <td>{this.renderCell(2, 2, this.state.selectedMenu.menu.snack.wednesday)}</td>
           <td>{this.renderCell(2, 3, this.state.selectedMenu.menu.snack.thursday)}</td>
           <td>{this.renderCell(2, 4, this.state.selectedMenu.menu.snack.friday)}</td>
           <td>{this.renderCell(2, 5, this.state.selectedMenu.menu.snack.saturday)}</td>
           <td>{this.renderCell(2, 6, this.state.selectedMenu.menu.snack.sunday)}</td>
        </tr>
        <tr>
           <td><span class="menu-label">Dinner</span></td>
           <td>{this.renderCell(3, 0, this.state.selectedMenu.menu.dinner.monday)}</td>
           <td>{this.renderCell(3, 1, this.state.selectedMenu.menu.dinner.tuesday)}</td>
           <td>{this.renderCell(3, 2, this.state.selectedMenu.menu.dinner.wednesday)}</td>
           <td>{this.renderCell(3, 3, this.state.selectedMenu.menu.dinner.thursday)}</td>
           <td>{this.renderCell(3, 4, this.state.selectedMenu.menu.dinner.friday)}</td>
           <td>{this.renderCell(3, 5, this.state.selectedMenu.menu.dinner.saturday)}</td>
           <td>{this.renderCell(3, 6, this.state.selectedMenu.menu.dinner.sunday)}</td>
        </tr>
         <tr>
           <td><span class="menu-label">Dessert</span></td>
           <td>{this.renderCell(4, 0, this.state.selectedMenu.menu.pudding.monday)}</td>
           <td>{this.renderCell(4, 1, this.state.selectedMenu.menu.pudding.tuesday)}</td>
           <td>{this.renderCell(4, 2, this.state.selectedMenu.menu.pudding.wednesday)}</td>
           <td>{this.renderCell(4, 3, this.state.selectedMenu.menu.pudding.thursday)}</td>
           <td>{this.renderCell(4, 4, this.state.selectedMenu.menu.pudding.friday)}</td>
           <td>{this.renderCell(4, 5, this.state.selectedMenu.menu.pudding.saturday)}</td>
           <td>{this.renderCell(4, 6, this.state.selectedMenu.menu.pudding.sunday)}</td>
        </tr>
        </tbody>
       </table>
      </div>
    )
  }
}

// MenuPlanner.propTypes = {
//   menuID: PropTypes.string.isRequired,
// }

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    selectedMenu: state.mealplanner.selectedMenu
  };
};

export default connect(mapStateToProps)(MenuPlanner);
