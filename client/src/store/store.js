import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';

import exampleData from './exampleData.js';
import outfitFuncs from '../redux-helpers/related/reduxOutfitList.js';
import funcs from '../redux-helpers/related/reduxRelatedProducts.js';
import {ProductData} from '../redux-helpers/currentProduct.reducers.js';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

var defaultState = {
  currentProductId: 24156,
  currentProductStyleIndex: 0,
  currentProductStars: 0,
  outfitList: [{ name: 'Add to Outfit' }],
};

const persistConfig = {
  key: 'outfitList',
  storage,
};

const rootReducer = combineReducers({
  currentProductId: funcs.currentProductIdReducer,
  currentProductData: ProductData,
  currentProductStyleIndex: funcs.currentProductStyleIndexReducer,
  currentProductStars: funcs.currentProductStarsReducer,
  outfitList: outfitFuncs.outfitListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allMiddleware = composeEnhancers(applyMiddleware(thunk));

const store = createStore(persistedReducer, defaultState, allMiddleware);

const persistor = persistStore(store);

const storeFuncs = { store, persistor };

export default { store, persistor, rootReducer };


//also works:
// export default createStore(
//   rootReducer,
//   {currentVideo: exampleVideoData[0], videoList: exampleVideoData},
//   applyMiddleware(thunk)
// );