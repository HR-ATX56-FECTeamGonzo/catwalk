import axios from './axios-config.js';
import calculateAverage from './calculateAverage.js';

// will be called like so: store.dispatch(getAllProductData)
const getAllProductData = (id) => {
  return (dispatch) => {
    // assign promises to variables first
    // review metadata
    var reviewMetadata = axios.get('/reviews/meta', {params: { 'product_id': id}});
    // product info
    var productInfo = axios.get(`products/${id}`);
    // related products
    var relatedProducts = axios.get(`products/${id}/related`);
    Promise.all([reviewMetadata, productInfo, relatedProducts])
      .then((data) => {
        // processing this will be a pain

      });
  };
};

export default getAllProductData;