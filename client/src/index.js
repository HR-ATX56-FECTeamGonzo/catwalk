import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import storeFuncs from './store/store.js';

// import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

Window._store = storeFuncs.store;
// storeFuncs.persistor.purge();  /* USE THIS TO RESET STORE */

ReactDOM.render(
  <Provider store={storeFuncs.store} >
    <PersistGate loading={null} persistor={storeFuncs.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
  //add anything to render upon DOM rendering
);

