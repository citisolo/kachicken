import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginComponent } from './LoginComponent';

Enzyme.configure({ adapter: new Adapter() });



function setup() {
  const props = {
    token: null,
    user: {},
  }

  const enzymeWrapper = mount(<LoginComponent/>)

  return {
    props,
    enzymeWrapper
  }
}

describe('LoginComponent Tests', () => {
  // const initialState = {
  //   token: null,
  //   user: {},
  //   menus: [],
  //   selectedMenu: {
  //     dummy: true,
  //     menu:{
  //       breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  //       lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  //       snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  //       dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  //       pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
  //     },
  //     menuFormat: {
  //       row:[],
  //       col:[],
  //       recipe: []
  //     }
  //   },
  // }
  // const mockStore = configureStore();
  // let store, wrapper;

  beforeEach(()=> {
    // store = mockStore(initialState);
     // wrapper = shallow( <Shell />)
  })

  it('renders without crashing', () => {
    const {enzymeWrapper} = setup();
    console.log(enzymeWrapper);
  });
});
