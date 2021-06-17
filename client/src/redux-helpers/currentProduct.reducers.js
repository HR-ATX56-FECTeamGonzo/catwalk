import Redux from 'redux';
import {createReducer} from '@reduxjs/toolkit';

// structure of currentProductData
var initialProduct = {
  id: 24156,
  name: '',
  description: '',
  features: [],
  reviewData: null, // will have avg rating and total rating count along with usual metadata
  ratingData: null,
  imageURL: ''
};

const updateProduct = (oldObj, newValue) => {
  return Object.assign({}, oldObj, newValue);
};


export const relatedProductsReducer = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_RELATED_PRODUCTS':
    return action.payload;
  default:
    return state;
  }
};

export const RatingData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_RATING_DATA':
    return updateProduct(state, {ratingData: action.payload});
  default:
    return state;
  }
};

const ReviewData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_REVIEW_DATA':
    return updateProduct(state, {reviewData: action.payload});
  default:
    return state;
  }
};

export const ProductData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_PRODUCT_DATA':
    return action.payload;
  default:
    return state;
  }
};
export const DefaultImage = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_PRODUCT_IMAGE_URL':
    return updateProduct(state, {imageURL: action.payload});
  default:
    return state;
  }
};

export const Product = createReducer(initialProduct, {
  UPDATE_RATING_DATA: RatingData,
  UPDATE_REVIEW_DATA: ReviewData,
  UPDATE_PRODUCT_IMAGE_URL: DefaultImage
});