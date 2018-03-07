import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './MenuCard.css';

var DummyMenus = [
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'Scot\'s American food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Mary's caribean menu",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'Amas Ghanaian food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Jacks southern menu",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Horatio's Detox menu",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: "Big Mama's Soul food Menu",
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    image: '/assets/img/menu.png',
    altImage: 'Card image cap',
    title: 'Scot\'s Scottish food',
    desc: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  }
]

class MenuCard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div class="card">
        <img class="card-img-top" src={this.props.image} alt={this.props.altImage}/>
        <div class="card-body bg-primary">
          <Link to={"/menu/" + this.props.menuID}  className="text-white">
            <h5 class="card-title">{this.props.title}</h5>
            <p class="card-text">{this.props.desc}</p>
          </Link>
        </div>
      </div>
    )
  }
}

MenuCard.propTypes = {
  image: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
}

export {DummyMenus};
export default MenuCard;
