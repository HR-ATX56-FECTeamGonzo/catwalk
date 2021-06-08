import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import { useDispatch, useSelector } from 'react-redux';

//action creators
const addRelatedProducts = (relatedProductsIdArray) => ({
  type: 'ADD_RELATED_PRODUCTS',
  relatedProductsIdArray
});

const getRelatedProducts = (productId) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/';
  let currentProductId = useSelector(state => state.currentProduct.id);

  return axios.get(`${url}products/${currentProductId}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
    .then((response) => {
      // console.log('this is results from metadata fetch', response.data);
      //dispatch to reducers
      dispatch(addRelatedProducts(response.data));
    })
    .catch(() => console.log('there has been an error fetching the metadata for related products'));
};

//reducers
const relatedProductsReducer = (previousState = [], action) => {
  switch (action.type) {
  case 'ADD_RELATED_PRODUCTS':
    return action.relatedProductsIdArray;
  default:
    return previousState;
  }
};

export default {
  addRelatedProducts,
  getRelatedProducts,
  relatedProductsReducer
};
