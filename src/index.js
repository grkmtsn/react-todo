import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '@/styles/_index.scss';

import AppReducer from '@/redux/reducers';
import App from './App';

const persistedState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : {};

const store = createStore(
  AppReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

const mountNode = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode,
);
