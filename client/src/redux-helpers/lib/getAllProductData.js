import axios from './axios-config.js';
import calculateAverage from './calculateAverage.js';
import { batch } from 'react-redux';
import processResponseData from '../currentProduct.actions.js';


// will be called like so: store.dispatch(getAllProductData)
export const dispatchAllProductData = (id, cancelToken = (axios.CancelToken.source()).token) => {
  return (dispatch) => {
    // assign promises to variables first
    // review metadata
    var reviewMetadata = axios.get('/reviews/meta', { params: { 'product_id': id } });
    // product info
    var productInfo = axios.get(`products/${id}`);
    // related products
    var relatedProducts = axios.get(`products/${id}/related`);
    // styles
    var styles = axios.get(`products/${id}/styles`);

    return Promise.all([reviewMetadata, productInfo, relatedProducts, styles])
      .then((responses) => {
        // processing this will be a pain
        let data = responses.map(x => x.data);
        //console.log('testing batch dispatch');
        dispatch(processResponseData(data));
        return true;
      })
      .catch(e => {
        if (axios.isCancel(e)) {
          console.error('request for product data cancelled - ' + e.message);
          return false;
        }
        console.error('error during dispatch to store - ' + e.message);
      });
  };
};

const findDefault = (arr) => {
  let index = arr.findIndex((style) => style['default?']);
  if (index === -1) {
    // console.log('no default style');
    index = 0;
  }
  return {...arr[index], index};
};

export const getAllProductData = (id) => {
  // assign promises to variables first
  // review metadata
  var reviewMetadata = axios.get('/reviews/meta', { params: { 'product_id': id } });
  // product info
  var productInfo = axios.get(`products/${id}`);
  // styles
  var styles = axios.get(`products/${id}/styles`);
  return Promise.all([reviewMetadata, productInfo, styles])
    .then((responses) => {
      let data = responses.map(x => x.data);
      let { id, name, category, features } = data[1];
      let defaultStyle = findDefault(data[2].results);
      let avgRating = calculateAverage(data[0].ratings);
      return {id, name, category, features, defaultStyle, avgRating};
    });

};