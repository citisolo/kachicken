import React, { Component } from 'react';
import './Register.css';
import { signup } from '../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Register extends Component {

   constructor(props){
     super(props);
     this.state = {
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        verified: false,
        verificationStyle: {
          'box-shadow' : '',
        },
        success: false
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   componentWillReceiveProps(props){
     console.log("getDerivedStateFromProps: called upon fetch");
     if(props.success){
       return {
         success : true
       }
     }
     return null;
   }

   getDerivedStateFromProps(props, state){
     console.log("getDerivedStateFromProps: called upon fetch");
     if(props.success){
       return {
         success : true
       }
     }
     return null;
   }

   verify(){
     if(this.state.passwordConf != this.state.password){
       this.setState({
         verified: true,
         verificationStyle: {
           'box-shadow' : '0 0 0 .2rem rgba(255, 0, 0, 0.3)',
         }
       });
     } else {
       this.setState({
         verified: false,
         verificationStyle: {
           'box-shadow' : '',
         }
       });
     }
   }

   handleChange(e){
     //console.log(e.target.id);

     switch(e.target.id){
       case "inputUsername":
        this.setState({username: e.target.value});
        break;
       case "exampleInputEmail1":
        this.setState({email: e.target.value});
        break;
       case "exampleInputPassword1":
        this.setState({password: e.target.value});
        this.verify();
        break;
       case "exampleInputPassword2":
        this.setState({passwordConf: e.target.value});
        this.verify();
        break;
      default:
        return;
     }
   }

   handleSubmit(e){
     e.preventDefault();
     const {username, email, password, passwordConf } = this.state;
      if(password != passwordConf){
        //display message
      } else {
        this.props.dispatch(signup(username, email, password, passwordConf, (response) => {
          if(response.ok){
            this.setState({
              success : true
            });
          }
        }))
      }
   }

   render(){
     if(this.state.success){
       return <Redirect to="/"/>
     }

     return (
       <div className="container mkss-center-container">
         <div className="card" style={{width: '20rem'}}>
           <div className="card-body">
             <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                 <label htmlFor="inputUsername">Username</label>
                 <input type="text" value={this.state.username} onChange={this.handleChange} className="form-control" id="inputUsername" aria-describedby="emailHelp" placeholder="Enter username"/>
               </div>
               <div className="form-group">
                 <label htmlFor="exampleInputEmail1">Email address</label>
                 <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
               </div>
               <div className="form-group">
                 <label htmlFor="exampleInputPassword1">Password</label>
                 <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
               </div>
               <div className="form-group">
                 <label htmlFor="exampleInputPassword2">CheckPassword</label>
                 <input style={this.state.verificationStyle} type="password" value={this.state.passwordConf} onChange={this.handleChange} className="form-control" id="exampleInputPassword2" placeholder="Password"/>
               </div>
               <button type="submit" className="btn btn-primary">Submit</button>
             </form>
           </div>
         </div>
        </div>
     )
   }
}
const mapStateToProps = (state) => {
  //console.log(state.windowObject);
  return {
    success: state.auth.signupSuccess
  };
};

export default connect(mapStateToProps)(Register);
// <form onSubmit={this.handleSubmit}>
//   <div className="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" value={this.state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
//   </div>
//   <div className="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
//   </div>
//   <div className="form-group">
//     <label for="exampleInputPassword2">CheckPassword</label>
//     <input type="password" value={this.state.passwordConf} className="form-control" id="exampleInputPassword2" placeholder="Password"/>
//   </div>
//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>
