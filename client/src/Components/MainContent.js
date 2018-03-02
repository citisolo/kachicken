import React, { Component } from 'react';

class MainContent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div class="row" id="spa-shell-main">
        {this.props.children}
      </div>
    )
  }
}

export default MainContent;
