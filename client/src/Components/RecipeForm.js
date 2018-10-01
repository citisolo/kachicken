import React, { Component } from 'react';
import './RecipeForm.css';
import { saveIngredient, getIngredients } from '../store/actions/mealplanner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class RecipeForm extends Component {

   constructor(props){
     super(props);
     this.state = {
        name: '',
        message:'',
        success: false,
        ingredients: [],
        units: [
          "kilogram(kg)",
          "tin",
          "cup",
          "gram/s(g)",
          "whole"
        ],
        ingInput: "",
        quanInput: 0,
        unitInput: "",
        ingList: []
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.addIngredient = this.addIngredient.bind(this);
     this.removeIngredient = this.removeIngredient.bind(this);
   }

   handleChange(e){
     console.log(e.target.value);
     switch(e.target.id){
      case "recipe-name":
        this.setState({name: e.target.value});
        break;
      case "ingredient-input":
        this.setState({ingInput: e.target.value});
        break;
      case "quantity-input":
        this.setState({quanInput: e.target.value});
        break;
      case "unit-input":
        this.setState({unitInput: e.target.value});
        break;
      default:
        return;
     }
   }

   handleSubmit(e){
     //e.preventDefault();
     // const {name} = this.state;
     //  if(name === ''){
     //    //display message
     //    console.log("please enter a valid name for ingredient");
     //  } else {
     //    this.props.dispatch(saveIngredient(name, (response) => {
     //      if(response.ok){
     //        this.setState( prev => ({
     //          ingredients: this.props.ingredients
     //        }));
     //      }
     //    }))
     //  }
   }

   addIngredient(e){
     e.preventDefault();
     let { ingInput, quanInput, unitInput } = this.state;

     let entry = {ingInput: ingInput, quanInput: quanInput, unitInput: unitInput };
     const newIngList = [...this.state.ingList];
     newIngList.push(entry);

     this.setState(prev => ({
        ingList: newIngList
     }))

   }

   removeIngredient(e){
     e.preventDefault();
     //console.log(e.target.value);
     let index = e.target.value;
     //console.log(this.state.ingList);
     let newIngList = [...this.state.ingList];
     newIngList.splice(index,1);
     //console.log(newIngList);
     this.setState({
       ingList: newIngList
     })
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
        ingredients: props.ingredients,
        ingInput: props.ingredients[0].name,
        unitInput: this.state.units[0]
      })
   }

   render(){
     //console.log(this.state.ingredients);
     const { ingInput, quanInput, unitInput } = this.state;
     let Ingredients = this.state.ingredients.map((entry, index) => {
       if(index === 0){
         return <option key={index} selected value={entry.name}> {entry.name} </option>
       }
       else{
         return <option key={index} value={entry.name}>{entry.name}</option>
       }
     });
     let Units = this.state.units.map((entry, index) => {
       if(index === 0){
         return <option key={index} selected value={entry.name}> {entry} </option>
       }
       else{
         return <option key={index} value={entry.name}>{entry}</option>
       }
     });

     let ingListItems = this.state.ingList.map((entry, index) => {
       return  (
         <tr>
           <td>
             {entry.ingInput}
           </td>
           <td>
             {entry.quanInput}
           </td>
           <td>
             {entry.unitInput}
           </td>
           <td>
             <button type="submit" onClick={this.removeIngredient} value={index} className="btn btn-secondary">-</button>
           </td>
         </tr>
       )
     })
     return (
       <div className="container mkss-center-container">
         <div className="card" style={{width: '40rem'}}>
           <div className="card-body">
           <div>{this.state.message}</div>
             <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                 <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control" id="recipe-name" aria-describedby="emailHelp" placeholder="Enter recipe name"/>
               </div>
               <div className="container" style={{margin: '0px 0px 10px 0px'}}>
                 <div class="row">
                    <div class="col-sm-2">
                      Serves:
                    </div>
                    <div class="col-sm-2">
                      <input type="number" min="1" value={this.state.servesInput} onChange={this.handleChange} className="form-control" id="serves-input" aria-describedby="emailHelp"/>
                    </div>
                    <div class="col-sm-8">

                    </div>
                  </div>
               </div>
               <table className="table">
                 <thead><tr><td>Ingredient</td><td>Quantity</td><td>Unit</td><td><p></p> </td></tr></thead>
                 <tbody>
                  <tr>
                    <td>
                      <select id="ingredient-input" onChange={this.handleChange} class="custom-select">
                        {Ingredients}
                      </select>
                    </td>
                    <td>
                      <div  className="form-group">
                        <input type="number" min="1" value={this.state.quanInput} onChange={this.handleChange} className="form-control" id="quantity-input" aria-describedby="emailHelp"/>
                      </div>
                    </td>
                    <td>
                    <select id="unit-input" onChange={this.handleChange} class="custom-select">
                      {Units}
                    </select>
                    </td>
                    <td>
                      <button type="submit" onClick={this.addIngredient} className="btn btn-secondary">+</button>
                    </td>
                  </tr>
                  {ingListItems}
                 </tbody>
               </table>
               <div className="dropdown-divider"></div>
               <ul className="list-group">

               </ul>
               <button type="submit" className="btn btn-primary">Submit</button>
             </form>
           </div>

         </div>
        </div>
     )
   }
}

const mapStateToProps = (state) => {

  return {
    recipes: state.mealplanner.recipes,
    ingredients: state.mealplanner.ingredients,
  };
};

export default connect(mapStateToProps)(RecipeForm);

// <ul className="list-group">
//  {Recipes}
// </ul>
