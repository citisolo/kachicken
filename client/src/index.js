import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import ContainerFluid from './Components/ContainerFluid';
import Header from './Components/Header';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import HeaderNav from './Components/HeaderNav';

ReactDOM.render((
  <BrowserRouter>
    <ContainerFluid>
      <Header> <HeaderNav></HeaderNav></Header>
        <MainContent>
          <App/>
        </MainContent>
      <Footer></Footer>
    </ContainerFluid>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
