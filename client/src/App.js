import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Shell from './Components/Shell';
import LandingPage from './Components/LandingPage';
import SearchPage from './Components/SearchPage';
import MenuPage from './Components/MenuPage';
import { Provider } from 'react-redux';
import configureStore from './store/configStore';
import LoginComponent from './Components/SubComponents/LoginComponent';
import Register from './Components/Register';
import UserPage from './Components/UserPage';
import IngredientForm from './Components/IngredientForm';
import RecipeForm from './Components/RecipeForm';
import VerificationPage from './Components/VerificationPage';

const store = configureStore({localstorage: localStorage, windowObject: window});
const loginComponent = <LoginComponent/>;
//console.log(loginComponent);
const App = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Shell loginComponent={loginComponent}>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/search' component={SearchPage}/>
            <Route path={"/menu/:menuID"} component={MenuPage}/>
            <Route path='/register' component={Register}/>
            <Route path={'/user/:userID'} component={UserPage}/>
            <Route path={'/ingredient/'} component={IngredientForm}/>
            <Route path={'/recipe/'} component={RecipeForm}/>
            <Route path={'/verified/'} component={VerificationPage}/>
          </Switch>
        </Shell>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
