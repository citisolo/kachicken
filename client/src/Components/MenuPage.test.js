import React from 'react';
import ReactDOM from 'react-dom';
import MenuPage from './MenuPage';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const id = "5a9bcf00ea9e59097033e0bd"
  shallow(<MenuPage menuID={id}/>);
  // const div = document.createElement('div');
  // ReactDOM.render(<MenuPage menuID={id} />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
