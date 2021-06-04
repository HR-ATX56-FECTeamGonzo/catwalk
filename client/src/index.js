import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import {Provider} from 'react-redux';
import store from './store/store.js';

Window._store = store;

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app')
  //add anything to render upon DOM rendering
);

