import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import placemasterApp from './src/reducers';

const store = createStore(
  placemasterApp,
  // enable redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
