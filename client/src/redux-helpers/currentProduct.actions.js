import Redux from 'redux';
import calculateAverage from './lib/calculateAverage.js';

const getDefaultImage = (arr) => {
  console.log(arr);
  if (!arr) {
    console.log('are you here');
    return '../../dist/no-image-available.png';
  }
  let index = arr.findIndex((style) => style['default?']);
  if (index === -1) {
    index = 0;
  }
  let info = arr[index];
  return info.photos[0].thumbnail_url;
};

const updateDefaultImage = (arr) => ({
  type: 'UPDATE_PRODUCT_IMAGE_URL',
  payload: getDefaultImage(arr)
});

const updateRelated = (products) => ({
  type: 'UPDATE_RELATED_PRODUCTS',
  payload: products
});

const updateRatingsData = (ratings) => ({
  type: 'UPDATE_RATING_METADATA',
  payload: {
    count: Object.values(ratings).reduce((sum, val) => sum + val),
    average: calculateAverage(ratings),
    ratings: ratings,
  }
});

const updateReviewData = (obj) => ({
  type: 'UPDATE_REVIEW_DATA',
  payload: obj
});

const processResponseData = (data) => {
  return (dispatch) => {
    console.log(data);
    dispatch(updateDefaultImage(data[3].results));
    dispatch(updateReviewData(data[0]));
    dispatch(updateRatingsData(data[0].ratings));

  };
};

export default processResponseData;