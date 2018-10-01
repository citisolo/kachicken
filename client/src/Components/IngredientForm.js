import React, { Component } from 'react';
import './IngredientForm.css';
import { saveIngredient, getIngredients } from '../store/actions/mealplanner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class IngredientForm extends Component {
   constructor(props){
     super(props);
     this.state = {
        name: '',
        message:'',
        success: false,
        ingredients: []
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this)
   }


   verify(){

   }

   handleChange(e){
     //console.log(e.target.id);
     switch(e.target.id){
       case "inputName":
        this.setState({name: e.target.value});
        break;
      default:
        return;
     }
   }

   handleSubmit(e){
     //e.preventDefault();
     const {name} = this.state;
      if(name === ''){
        //display message
        console.log("please enter a valid name for ingredient");
      } else {
        this.props.dispatch(saveIngredient(name, (response) => {
          if(response.ok){
            this.setState( prev => ({
              ingredients: this.props.ingredients
            }));
          }
        }))
      }
   }

   componentDidMount(){
      this.props.dispatch(getIngredients((response) => {
        if(response.ok){
          this.setState( prev => ({
            success: !prev.success
          }));
        }
      }))
   }

   componentWillReceiveProps(props){
     console.log(props);
      this.setState({
        ingredients: props.ingredients
      })
   }

   render(){
     //console.log(this.state.ingredients);
     let Ingredients = this.state.ingredients.map((entry, index) => {
       return <li key={index} className="list-group-item">{entry.name}</li>
     });

     return (
       <div className="container mkss-center-container">
         <div className="card" style={{width: '40rem'}}>
           <div className="card-body">
             <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                 <label htmlFor="inputName">Ingredient</label>
                 <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Enter Ingredient"/>
               </div>
               <div>{this.state.message}</div>
               <button type="submit" className="btn btn-primary">Submit</button>
             </form>
           </div>
           <ul className="list-group">
            {Ingredients}
           </ul>
         </div>
        </div>
     )
   }
}

const mapStateToProps = (state) => {
  //console.log(state.windowObject);
  return {
    ingredients: state.mealplanner.ingredients,
    saveIngredientSuccess: state.mealplanner.saveIngredientSuccess
  };
};

export default connect(mapStateToProps)(IngredientForm);
