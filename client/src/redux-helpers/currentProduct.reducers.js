
export const styleData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_STYLE_DATA':
    return action.payload;
  default:
    return state;
  }
};

export const productData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_PRODUCT_DATA':
    return action.payload;
  default:
    return state;
  }
};

export const ratingData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_RATING_DATA':
    return action.payload;
  default:
    return state;
  }
};


export const reviewData = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_REVIEW_DATA':
    return action.payload;
  default:
    return state;
  }
};

export const related = (state = null, action) => {
  switch (action.type) {
  case 'UPDATE_RELATED_PRODUCTS':
    return action.payload;
  default:
    return state;
  }
};

