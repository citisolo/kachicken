import React from 'react';
// import ReactDOM from 'react-dom';
import  MenuPage  from './MenuPage';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from '../store/configStore';

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
    match: {
      params: {
        menuID:"5a9e95b4bd276965bc633928",
      }
    }
  }


  const wrapper = mount(<Provider store={store}><MenuPage{...props}/></Provider>);
  return {
    props,
    wrapper
  }
}

describe('MenuPage', () => {
  beforeEach(()=> {
    // store = mockStore(initialState);
     // wrapper = shallow( <Shell />)
  })

  it('renders without crashing', () => {
    const {wrapper} = setup();

  });

  // it('renders properly visually', () => {
  //   const {wrapper} = setup();
  //
  // });

});

it('renders without crashing', () => {
  const id = "5a9bcf00ea9e59097033e0bd"
  // mount(<MenuPage menuID={id}/>);
  // const div = document.createElement('div');
  // ReactDOM.render(<MenuPage menuID={id} />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
