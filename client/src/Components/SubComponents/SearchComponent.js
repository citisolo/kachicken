import React, { Component } from 'react';
import GridList from './GridList';
import MenuCard from './MenuCard';
//import SubComponents from './MenuCard';

import './SearchComponent.css';

var Menus = [
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'Caribean food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Southern Food",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'African Food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Low Carb recipes",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Mexican Food",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Soul food",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'Indian food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  }
]

class SearchComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){

    let menuItems = Menus.map((item) => {
      return (
        <div>
          <MenuCard
                    title={item.title}
                    desc={item.desc}></MenuCard>
        </div>
      )
    })

    return (
      <div>
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

export default SearchComponent;
