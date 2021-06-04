import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './../reducers/main.js';
import exampleData from './exampleData.js';

const defaultState = {
  currentProduct: exampleData
};

const rootReducer = combineReducers({
  //add our reducers later
});


const reduxEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer, reduxEnhancer);

const store = createStore(rootReducer, defaultState, composedEnhancers);

window.__store = store;

export default store;

//also works:
// export default createStore(
//   rootReducer,
//   {currentVideo: exampleVideoData[0], videoList: exampleVideoData},
//   applyMiddleware(thunk)
// );