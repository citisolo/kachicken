import React, { Component } from 'react';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div class="row" id="spa-shell-foot">
         <div class="col">
          {this.props.children}
         </div>
      </div>
    )
  }

}

export default Footer;
