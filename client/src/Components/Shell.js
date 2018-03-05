import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer'

import './Shell.css';

class Shell extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
       <div id="spa" className="container-fluid">
         <Header> </Header>
         <div id="main-body" className="card">
           <div className="card-body">
             {this.props.children}
           </div>
           <div className="card-footer text-muted text-center">
           <Footer> </Footer>
           </div>
         </div>
       </div>
    )
  }
}

export default Shell;
