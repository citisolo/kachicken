import React, { Component } from 'react';
import ContainerFluid from './ContainerFluid';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';


class About extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ContainerFluid>
        <Header></Header>
        <MainContent> </MainContent>
        <Footer></Footer>
      </ContainerFluid>
    )
  }
}

export default About;
