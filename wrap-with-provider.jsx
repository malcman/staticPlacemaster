import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import placemasterApp from './src/reducers';


const loggerMiddleWare = createLogger();
let composeEnhancer = compose;
if (window) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(
  placemasterApp,
  // enable redux dev tools
  // and thunk, logger middleware
  composeEnhancer(applyMiddleware(thunkMiddleware, loggerMiddleWare)),
);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
