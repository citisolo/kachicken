import React, { Component } from 'react';
import { login } from '../../store/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './LoginComponent.css';

class LoginComponent extends Component {
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
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    let email = this.state.email;
    let password = this.state.password;
    this.dispatch(login(email, password));
    event.preventDefault();
  }

  render(){
    return (
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" value={this.state.email} class="form-control" id=
                "exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email" /> 
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" value={this.state.password} class="form-control" id=
                "exampleInputPassword1" placeholder="Password" />
              </div>
              <div class="form-check">
                <input type="checkbox" value={this.state.checkbox} class="form-check-input" id=
                "exampleCheck1" /> <label class="form-check-label" for=
                "exampleCheck1">remember me</label>
              </div><button type="submit" class=
              "btn btn-primary" >Submit</button>
            </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.token
  };
};

// export connect(mapStateToProps)(MenuItem);
//export default connect(mapStateToProps)(MenuPlanner, MenuItem);
export default connect(mapStateToProps)(LoginComponent);
