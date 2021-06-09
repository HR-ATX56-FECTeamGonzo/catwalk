import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './../reducers/main.js';
import exampleData from './exampleData.js';
import {relatedProductsReducer} from '../redux-helpers/related/reduxRelatedProducts.js';

var defaultState = {
  currentProduct: exampleData,
  relatedProducts: []
};

const rootReducer = combineReducers({
  //add currentProductReducer or redux state tree won't render
  // currentProduct:
  relatedProducts: relatedProductsReducer
});


// const reduxEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const middlewareEnhancer = applyMiddleware(thunk);
// const composedEnhancers = compose(middlewareEnhancer, reduxEnhancer);
// const store = createStore(rootReducer, defaultState, composedEnhancers);

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;

//also works:
// export default createStore(
//   rootReducer,
//   {currentVideo: exampleVideoData[0], videoList: exampleVideoData},
//   applyMiddleware(thunk)
// );