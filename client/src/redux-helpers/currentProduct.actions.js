import Redux from 'redux';
import calculateAverage from './lib/calculateAverage.js';
import { batch } from 'react-redux';

const updateProductData = (obj) => {
  let { name, category, description, features, slogan } = obj;
  return {
    type: 'UPDATE_PRODUCT_DATA',
    payload: { name, category, description, features, slogan }
  };
};

const updateStyleData = (arr) => {
  let index = arr.findIndex((style) => style['default?']);
  if (index === -1) {
    // console.log('no default style');
    index = 0;
  }
  let defaultStyle = arr[index];
  // console.log(JSON.stringify(defaultStyle));
  return {
    type: 'UPDATE_STYLE_DATA',
    payload: {
      styles: arr,
      defaultStyle: {
        'original_price': defaultStyle['original_price'],
        'sale_price': defaultStyle['sale_price'],
        name: defaultStyle.name,
        'thumbnail_url': defaultStyle.photos[0].thumbnail_url
      }
    }
  };
};

const updateRatingsData = (ratings) => {
  let payload;
  if (Object.keys(ratings).length === 0) {
    payload = { count: 0, average: 0, ratings: 0 };
  } else {
    payload = {
      count: Object.values(ratings).reduce((sum, val) => parseInt(sum) + parseInt(val)),
      average: calculateAverage(ratings),
      ratings: ratings,
    };
  }
  return ({ type: 'UPDATE_RATING_DATA', payload });
};

const updateRelated = (products) => ({
  type: 'UPDATE_RELATED_PRODUCTS',
  payload: products
});

const updateReviewData = (obj) => {
  let { recommended, characteristics } = obj;
  return {
    type: 'UPDATE_REVIEW_DATA',
    payload: { recommended, characteristics }
  };
};

const processResponseData = (data) => {
  return (dispatch) => {
    //console.log(data);
    dispatch(updateProductData(data[1]));
    dispatch(updateStyleData(data[3].results));
    dispatch(updateReviewData(data[0]));
    dispatch(updateRatingsData(data[0].ratings));
    dispatch(updateRelated(data[2]));

  };
};

export default processResponseData;

