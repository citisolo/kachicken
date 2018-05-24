import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import Shell from './Shell';


function setup() {
  const props = {}

  const enzymeWrapper = mount(<Shell/>)

  return {
    props,
    enzymeWrapper
  }
}

describe('Shell Tests', () => {
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

  });
});
