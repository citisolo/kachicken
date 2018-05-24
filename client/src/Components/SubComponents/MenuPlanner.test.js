import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import MenuPlanner  from './MenuPlanner';
import { Provider } from 'react-redux';
import configureMockStore from '../../store/configStore';

Enzyme.configure({ adapter: new Adapter() });

function createStorageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

function setup() {
  const localStorageMock = createStorageMock();
  const store = configureMockStore({
                              windowObject :{localStorage: localStorageMock},
                            });
  const props = {
    token: null,
    user: {},
    menuID:"5a9e95b4bd276965bc633928",
    menus: [],
    selectedMenu: {
      dummy: true,
      menu:{
        breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
        pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
      },
      menuFormat: {
        row:[],
        col:[],
        recipe: []
      }
    },
    menuFormat: {
      row:[],
      col:[],
      recipe: []
    }
  }


  const wrapper = mount(<Provider store={store}><MenuPlanner{...props}/></Provider>)
  return {
    props,
    wrapper
  }
}

describe('MenuPlanner Tests', () => {
  beforeEach(()=> {
    // store = mockStore(initialState);
     // wrapper = shallow( <Shell />)
  })

  it('renders without crashing', () => {
    const {wrapper} = setup();

  });

  it('renders properly visually', () => {
    const {wrapper} = setup();

  });

  it('caches recipes', () => {
    const {wrapper} = setup();

  });

  it('adds a recipe', () => {
    const {wrapper} = setup();

  });

  it('removes a recipe', () => {
    const {wrapper} = setup();

  });
});
