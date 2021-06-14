import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';

import exampleData from './exampleData.js';
import outfitFuncs from '../redux-helpers/related/reduxOutfitList.js';
import funcs from '../redux-helpers/related/reduxRelatedProducts.js';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

var defaultState = {
  currentProductId: 0,
  // currentProductInfo: exampleData,
  // currentProductStyles:
  // currentProductStars:
  // relatedProducts: [],
  outfitList: [{ name: 'Add to Outfit', imageUrl: './add-icon.png' }, { id: 24156 }],
};

const persistConfig = {
  key: 'outfitList',
  storage,
};

const rootReducer = combineReducers({
  // currentProduct:
  // relatedProducts: relatedProductsReducer
  currentProductId: funcs.currentProductIdReducer,
  outfitList: outfitFuncs.outfitListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const reduxEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const middlewareEnhancer = applyMiddleware(thunk);
// const composedEnhancers = compose(middlewareEnhancer, reduxEnhancer);
// const store = createStore(rootReducer, defaultState, composedEnhancers);

const store = createStore(persistedReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store);

const storeFuncs = { store, persistor }

export default { store, persistor };


//also works:
// export default createStore(
//   rootReducer,
//   {currentVideo: exampleVideoData[0], videoList: exampleVideoData},
//   applyMiddleware(thunk)
// );