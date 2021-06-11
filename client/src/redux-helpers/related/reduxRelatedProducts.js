import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import { useDispatch, useSelector } from 'react-redux';
import exampleData from '../../store/exampleData.js';

const funcs = {
  updateCurrentProductId: (id) => ({
    type: 'UPDATE_CURRENT_PRODUCT_ID',
    payload: id,
  }),

  updateCurrentProductStyleIndex: (index) => ({
    type: 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX',
    payload: index,
  }),

  currentProductIdReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_ID':
        return action.payload;
      default:
        return previousState;
    }
  },

  currentProductStyleIndexReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX':
        return action.payload;
      default:
        return previousState;
    }
  },

}

export default funcs;

//action creators
// export const addRelatedProducts = (relatedProductsArray) => ({
//   type: 'ADD_RELATED_PRODUCTS',
//   relatedProductsArray
// });

//
//
//need to pass in parameter 'productId' and replace exampleData.id
// export const getRelatedProducts = () => {
//   let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/';
//   // let currentProductId = useSelector(state => state.currentProduct.id);

//   return axios.get(`${url}products/${exampleData.id}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
//     .then((response) => {
//       console.log(response);
//       let relatedProductsArray = [];
//       for (var i = 0; i < response.data; i++) {
//         relatedProductsArray.push(axios.get(`${url}products/${response.data[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}}));
//       }
//       return Promise.all(relatedProductsArray);
//     })
//     .then((result) => {
//       console.log(result);
//       dispatch(addRelatedProducts(result.data));
//     })
//     .catch(() => console.log('there has been an error fetching the metadata for related products'));
// };

//reducers
// export const relatedProductsReducer = (previousState = [], action) => {
//   switch (action.type) {
//   case 'ADD_RELATED_PRODUCTS':
//     return action.relatedProductsArray;
//   default:
//     return previousState;
//   }
// };

