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

  // reviewCount = 0;
  return (
    <div id='ProductInfo'>
      <Rating ratings={currentProduct.reviewMetadata.ratings}/>
      <p>Category: {currentProduct.category}</p>
      <p>Product Name: {currentProduct.name}</p>
    </div>
  );
};

export default ProductInfo;