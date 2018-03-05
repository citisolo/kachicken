import React, { Component } from 'react';
import Header from './Header';
import Shell from './Shell';
import GridList from './SubComponents/GridList';
import MenuCard, {DummyMenus as Menus} from './SubComponents/MenuCard';
import SubComponents from './SubComponents/MenuCard';

import './SearchPage.css';

class SearchPage extends Component {
  constructor(props){
    super(props);
  }

  render(){

    let menuItems = Menus.map((item) => {
      return (
        <div>
          <MenuCard image={item.image}
                    altImage={item.altImage}
                    title={item.title}
                    desc={item.desc}></MenuCard>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="input-group mkss-search">
          <input type="text" className="form-control" placeholder="Search for..."/>
        </div>
        <GridList>
          {menuItems}
        </GridList>
      </div>
    )
  }
}

export default SearchPage;
