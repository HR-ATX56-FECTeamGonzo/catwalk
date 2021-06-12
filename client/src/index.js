import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import {Provider} from 'react-redux';
import store from './store/store.js';
import getAllProductData from './redux-helpers/lib/getAllProductData.js';
Window._store = store;

store.dispatch(getAllProductData(24156));
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app')
  //add anything to render upon DOM rendering
);

