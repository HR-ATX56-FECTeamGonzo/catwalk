import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './../reducers/main.js';
import exampleData from './exampleData.js';
import outfitFuncs from '../redux-helpers/related/reduxOutfitList.js';
import funcs from '../redux-helpers/related/reduxRelatedProducts.js';

var defaultState = {
  currentProductId: 0,
  // currentProductInfo: exampleData,
  // currentProductStyles:
  // currentProductStars:
  // relatedProducts: [],
  outfitList: [{ name: 'Add to Outfit', imageUrl: './add-icon.png' }, { id: 24156 }],
};

const rootReducer = combineReducers({
  // currentProduct:
  // relatedProducts: relatedProductsReducer
  currentProductId: funcs.currentProductIdReducer,
  outfitList: outfitFuncs.outfitListReducer
});


// const reduxEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const middlewareEnhancer = applyMiddleware(thunk);
// const composedEnhancers = compose(middlewareEnhancer, reduxEnhancer);
// const store = createStore(rootReducer, defaultState, composedEnhancers);

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;

//also works:
// export default createStore(
//   rootReducer,
//   {currentVideo: exampleVideoData[0], videoList: exampleVideoData},
//   applyMiddleware(thunk)
// );