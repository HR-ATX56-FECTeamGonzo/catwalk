import axios from './axios-config.js';
import calculateAverage from './calculateAverage.js';
import {batch} from 'react-redux';
import process from '../currentProduct.actions.js';

const getDefaultStyle = (arr) => {
  let index = arr.findIndex((style) => style['default?']);
  if (index === -1) {
    index = 0;
  }
  let info = arr[index];
  return {info, index};
};

// will be called like so: store.dispatch(getAllProductData)
export const dispatchAllProductData = (id, cancelToken = (axios.CancelToken.source()).token) => {
  return (dispatch) => {
    // assign promises to variables first
    // review metadata
    var reviewMetadata = axios.get('/reviews/meta', {params: { 'product_id': id}});
    // product info
    var productInfo = axios.get(`products/${id}`);
    // related products
    var relatedProducts = axios.get(`products/${id}/related`);
    // styles
    var styles = axios.get(`products/${id}/styles`);

    Promise.all([reviewMetadata, productInfo, relatedProducts, styles])
      .then((responses) => {
        // processing this will be a pain
        let data = responses.map(x => x.data);
        var productData = {
          name: data[1].name,
          features: data[1].features,
          category: data[1].category,
          ratings: data[0].ratings
        };
        console.log('testing batch dispatch');
        batch(() => {
          dispatch(process(data));
          dispatch({ type: 'UPDATE_PRODUCT_DATA', payload: productData});
        });
        return data;
      })
      .catch(e => {
        if (axios.isCancel(e)) {
          console.error('request for product data cancelled - ' + e.message);
          return;
        }
        console.error('request during dispatch to store - ' + e.message);
      });
  };
};


export const getAllProductData = (id, cancelToken = (axios.CancelToken.source()).token) => {
  // assign promises to variables first
  // review metadata
  var reviewMetadata = axios.get('/reviews/meta', {params: { 'product_id': id}}, {cancelToken});
  // product info
  var productInfo = axios.get(`products/${id}`, { cancelToken });
  // related products
  var relatedProducts = axios.get(`products/${id}/related`, { cancelToken });
  // styles
  var styles = axios.get(`products/${id}/styles`, { cancelToken });
  return Promise.all([reviewMetadata, productInfo, styles])
    .then((data) => {
      return data.map(x => x.data);
    });

};