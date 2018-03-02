import React, { Component } from 'react';

class ContainerFluid extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="spa" className="container">
        {this.props.children}
      </div>
    )
  }
}

export default ContainerFluid;
