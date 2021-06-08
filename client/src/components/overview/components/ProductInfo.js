import React from 'react';
import Rating from './Rating.js';
import exampleData from '../exampleData.js';
// info needed:
// avg rating + review count
// doesn't display if no reviews
// category + title
// price
// displays differently for a sale
// product description (this is the slogan + checklist at the bottom)

const ProductInfo = ({currentProduct, style}) => {
  // don't display this if no reviews
  var reviewCount = 0;
  var rating = 0;
  for (const [key, value] of Object.entries(currentProduct.reviewMetadata.ratings) ) {
    reviewCount += parseInt(value);
    rating += (key * value);
  }
  if (reviewCount > 0) {
    // round to nearest quarter
    rating /= reviewCount;
    rating = (Math.round(rating * 4) / 4);
  }
  // reviewCount = 0;
  return (
    <div id='ProductInfo'>
      {reviewCount > 0 ?
        <Rating
          rating={rating}
          reviewCount={reviewCount} /> : null }
    </div>
  );
};

export default ProductInfo;