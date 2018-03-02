import React, { Component } from 'react';
import Header from './Header';

import './Shell.css';

class Shell extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
       <div id="spa" class="container-fluid">
         <Header> </Header>
         <div id="main-body" class="card">
           <div class="card-body">
             {this.props.children}
           </div>
           <div class="card-footer text-muted text-center">
             <ul class=" footer">
               <li class="nav-item">
                 <a class="nav-link" href="#">contact</a>
               </li>
               <li class="nav-item">
                 <a class="nav-link" href="#">home</a>
               </li>
               <li class="nav-item">
                 <a class="nav-link" href="#">about</a>
               </li>
             </ul>
           </div>
         </div>
       </div>
    )
  }
}

export default Shell;
