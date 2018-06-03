import React, { Component } from 'react';
import { login } from '../../store/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import {Link} from 'react-router-dom';

import './LoginComponent.css';

export class LoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      checkbox: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event){
    let name = event.target.name
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event){
    let email = this.state.email;
    let password = this.state.password;
    this.props.dispatch(login(email, password));
    event.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
    }
  }

  render(){
    const { success, token, user, location} = this.props;
    console.log(location.pathname);
    let userPath = '/user/'+ this.props.user;

    let elems = '';

    if(location.pathname === userPath){
      elems = <Link to='LogOut'>Log out</Link>
    }
    else if(this.props.success){
      elems = <Redirect to={userPath}/>
    }
    else {
      elems = <div>
          <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id=
             "exampleInputEmail1" aria-describedby="emailHelp"
             placeholder="Enter email" />
           </div>
           <div className="form-group">
             <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id=
             "exampleInputPassword1" placeholder="Password" />
           </div>
           <div className="form-check">
             <input type="checkbox" value={this.state.checkbox} className="form-check-input" id=
             "exampleCheck1" /> <label className="form-check-label" htmlFor=
             "exampleCheck1">remember me</label>
           </div><button type="submit" className=
           "btn btn-primary" >Submit</button>
         </form>
         <div className="dropdown-divider"></div>
         <Link className="dropdown-item" to='/register'>Sign up</Link>
         <Link className="dropdown-item" to='/'>Forgot password</Link>
         </div>
    }

    return elems;

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    success: state.auth.success
  };
};

// export connect(mapStateToProps)(MenuItem);
//export default connect(mapStateToProps)(MenuPlanner, MenuItem);

export default withRouter(connect(mapStateToProps)(LoginComponent));
