import Redux from 'redux';


export const averageRatingReducer = (state = 0, action) => {
  switch (action.type) {
  case 'UPDATE_AVG_RATING':
    return action.payload;
  default:
    return state;
  }
};

export const relatedProductsReducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_RELATED_PRODUCTS':
    return action.payload;
  default:
    return state;
  }
};

export const ratingsReducer = (state = {}, action) => {
  switch (action.type) {
  case 'UPDATE_RATING_METADATA':
    return action.payload;
  default:
    return state;
  }
};