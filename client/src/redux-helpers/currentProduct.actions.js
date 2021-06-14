import Redux from 'redux';
import axios from './axios-config.js';
import calculateAverage from './calculateAverage.js';


const updateAverage = (rating) => ({
  type: 'UPDATE_AVG_RATING',
  payload: rating
});

const updateRelated = (products) => ({
  type: 'UPDATE_RELATED_PRODUCTS',
  payload: products
});

const updateMetaData = (ratings) => ({
  type: 'UPDATE_RATING_METADATA',
  payload: {
    total: Object.values(ratings).reduce((sum, val) => sum + val),
    ratings: ratings
  }
});

const processReviewData = (id) => {
  return (dispatch) => {
    axios.get('/reviews/meta', {params: { 'product_id': id}})
      .then(({data}) => {
        dispatch(updateAverage(calculateAverage(data.ratings)));
        dispatch(updateMetaData(data.ratings));
      });
  };
};

export default processReviewData;