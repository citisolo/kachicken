import React, { Component } from 'react';
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import { getMenu, getRecipe } from '../../store/actions/mealplanner';
import PropTypes from 'prop-types';
import {MenuFormatter} from 'menu-planner-utils';
import Modal from 'react-modal';
import SearchComponent from './SearchComponent';

import './MenuPlanner.css';

class MenuCell extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes:[],
    }

    this.remove = this.remove.bind(this);
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

  remove(index){
    //console.log(this.props.recipes);
    const result = this.state.recipes.filter((item, idx) => idx != index );
    this.setState({
      recipes: result
    })
    this.props.remove(this.props.position, index);
  }

  render(){
    let items = this.state.recipes.map((item, index) => {
        if(item === null){
          item = {};
          item.name="Null";
        }
        return (<MenuItem key={index} index={index} remove={this.remove} position={this.props.position} text={item.name}> </MenuItem>)
      })

    return (
      <div className="menu-cell">
        {items}
      </div>
    )
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '800px',
    height                : '500px'
  }
};

class MenuPlanner extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false,
      menu:{
        breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
      },
      selectedMenu: {
        menu:{
          breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
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

    this.removeItem = this.removeItem.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(props){
    console.log(props);
    this.setState({
      selectedMenu: props.selectedMenu,
      menu: MenuFormatter.decode(props.menuFormat)
    })
  }

  componentDidMount(){
     this.props.dispatch(getMenu(this.props.menuID));
     this.setState({
       selectedMenu: this.props.selectedMenu,
       menu: MenuFormatter.decode(this.props.menuFormat)
     })
  }

  removeItem(pos, index){
    var menu = Object.assign({}, this.state.menu);
    const result = menu[pos.row][pos.col].filter((item, idx) => idx != index );
    console.log(result);
    menu[pos.row][pos.col] = result;
    localStorage.setItem(this.props.menuID, JSON.stringify(menu));
    this.setState({
      menu: menu
    })
  }

  renderCell(row, col, val){
     let pos = {row, col};
     return (<MenuCell position={pos} recipes={val} remove={this.removeItem}></MenuCell>)
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render(){
    // console.log("render");
    console.log(this.state.menu)
    let cachedMenu = JSON.parse(localStorage.getItem(this.props.menuID)) ;
    if(cachedMenu){
      //console.log(m);
      this.state.menu = cachedMenu;
    }
    return(
      <div id="menu-calendar">
        <table className="menu-table">
        <tbody>
        <tr className="btn-primary" id="menu-header-row">
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
           <td >{this.renderCell("breakfast", "monday", this.state.menu.breakfast.monday)}</td>
           <td>{this.renderCell("breakfast", "tuesday", this.state.menu.breakfast.tuesday)}</td>
           <td>{this.renderCell("breakfast", "wednesday", this.state.menu.breakfast.wednesday)}</td>
           <td>{this.renderCell("breakfast", "thursday", this.state.menu.breakfast.thursday)}</td>
           <td>{this.renderCell("breakfast", "friday", this.state.menu.breakfast.friday)}</td>
           <td>{this.renderCell("breakfast", "saturday",this.state.menu.breakfast.saturday)}</td>
           <td>{this.renderCell("breakfast", "sunday", this.state.menu.breakfast.sunday)}</td>
        </tr>
        <tr className="menu-add-row">
           <td></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
        </tr>
        <tr>
           <td><span className="menu-label">Lunch</span></td>
           <td>{this.renderCell("lunch", "monday", this.state.menu.lunch.monday)}</td>
           <td>{this.renderCell("lunch", "tuesday",this.state.menu.lunch.tuesday)}</td>
           <td>{this.renderCell("lunch", "wednesday",this.state.menu.lunch.wednesday)}</td>
           <td>{this.renderCell("lunch", "thursday",this.state.menu.lunch.thursday)}</td>
           <td>{this.renderCell("lunch", "friday",this.state.menu.lunch.friday)}</td>
           <td>{this.renderCell("lunch", "saturday",this.state.menu.lunch.saturday)}</td>
           <td>{this.renderCell("lunch", "sunday",this.state.menu.lunch.sunday)}</td>
        </tr>
        <tr className="menu-add-row">
           <td></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
        </tr>
        <tr>
           <td><span className="menu-label">Snack</span></td>
           <td>{this.renderCell("snack", "monday", this.state.menu.snack.monday)}</td>
           <td>{this.renderCell("snack", "tuesday", this.state.menu.snack.tuesday)}</td>
           <td>{this.renderCell("snack", "wednesday", this.state.menu.snack.wednesday)}</td>
           <td>{this.renderCell("snack", "thursday", this.state.menu.snack.thursday)}</td>
           <td>{this.renderCell("snack", "friday", this.state.menu.snack.friday)}</td>
           <td>{this.renderCell("snack", "saturday", this.state.menu.snack.saturday)}</td>
           <td>{this.renderCell("snack", "sunday", this.state.menu.snack.sunday)}</td>
        </tr>
        <tr className="menu-add-row">
           <td></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
        </tr>
        <tr>
           <td><span className="menu-label">Dinner</span></td>
           <td>{this.renderCell("dinner", "monday", this.state.menu.dinner.monday)}</td>
           <td>{this.renderCell("dinner", "tuesday", this.state.menu.dinner.tuesday)}</td>
           <td>{this.renderCell("dinner", "wednesday", this.state.menu.dinner.wednesday)}</td>
           <td>{this.renderCell("dinner", "thursday", this.state.menu.dinner.thursday)}</td>
           <td>{this.renderCell("dinner", "friday", this.state.menu.dinner.friday)}</td>
           <td>{this.renderCell("dinner", "saturday", this.state.menu.dinner.saturday)}</td>
           <td>{this.renderCell("dinner", "sunday", this.state.menu.dinner.sunday)}</td>
        </tr>
        <tr className="menu-add-row">
           <td></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
        </tr>
         <tr>
           <td><span className="menu-label">Dessert</span></td>
           <td>{this.renderCell("pudding", "monday", this.state.menu.pudding.monday)}</td>
           <td>{this.renderCell("pudding", "tuesday", this.state.menu.pudding.tuesday)}</td>
           <td>{this.renderCell("pudding", "wednesday", this.state.menu.pudding.wednesday)}</td>
           <td>{this.renderCell("pudding", "thursday", this.state.menu.pudding.thursday)}</td>
           <td>{this.renderCell("pudding", "friday", this.state.menu.pudding.friday)}</td>
           <td>{this.renderCell("pudding", "saturday",this.state.menu.pudding.saturday)}</td>
           <td>{this.renderCell("pudding", "sunday",this.state.menu.pudding.sunday)}</td>
        </tr>
        <tr className="menu-add-row">
           <td></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
           <td><div className="menu-item-add"><span className="menu-item-utility-add badge badge-default" onClick={this.openModal}><i class="fas fa-plus-circle"></i></span></div></td>
        </tr>
        </tbody>
       </table>
       <button type="button" id="menu-save-button" class="btn btn-primary">Save Menu</button>
       <div className="container">
       <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">

        <SearchComponent/>
        </Modal>
       </div>
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

// export connect(mapStateToProps)(MenuItem);
//export default connect(mapStateToProps)(MenuPlanner, MenuItem);
export default connect(mapStateToProps)(MenuPlanner);
