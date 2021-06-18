import Redux from 'redux';
import {createReducer} from '@reduxjs/toolkit';

// structure of currentProductData
var initialProduct = {
  name: null,
  description: null,
  features: null,
  category: null,
  reviewData: null, // will have avg rating and total rating count along with usual metadata
  ratingData: null,
  defaultStyle: null,
  related: []
};

const updateProduct = (oldObj, newValue) => {
  return Object.assign({}, oldObj, newValue);
};

const DefaultStyle = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_DEFAULT_STYLE':
    return updateProduct(state, {defaultStyle: action.payload});
  default:
    return state;
  }
};

const Name = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_NAME':
    return updateProduct(state, action.payload);
  default:
    return state;
  }
};

const RatingData = (state = null, action) => {
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

const Related = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_RELATED_PRODUCTS':
    return updateProduct(state, {related: action.payload});
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


export const Product = createReducer(initialProduct, {
  UPDATE_NAME: Name,
  UPDATE_RATING_DATA: RatingData,
  UPDATE_REVIEW_DATA: ReviewData,
  UPDATE_DEFAULT_STYLE: DefaultStyle,
  UPDATE_RELATED_PRODUCTS: Related
});

