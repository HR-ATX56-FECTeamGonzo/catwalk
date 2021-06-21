import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import outfitFuncs from '../redux-helpers/related/reduxOutfitList.js';
import funcs from '../redux-helpers/related/reduxRelatedProducts.js';
import { ratingData, styleData, reviewData, related, productData } from '../redux-helpers/currentProduct.reducers.js';
import defaultState from './initialState.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'outfitList',
  storage,
  whitelist: ['outfitList']
};

const rootReducer = combineReducers({
  styleData,
  ratingData,
  reviewData,
  related,
  productData,
  currentProductId: funcs.currentProductIdReducer,
  styleIndex: funcs.currentProductStyleIndexReducer,
  outfitList: outfitFuncs.outfitListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 80 }) || compose;
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