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
const Price = ({prices}) => {
  const strDisplay = {
    'text-decoration': 'line-through'
  };

  return (
    <div id='price'>
      <span style={prices.sale ? strDisplay : null }>${prices.original} </span>
      {prices.sale && <span style={{color: 'red'}}>${prices.sale}</span>}
    </div>
  );
};

const ProductInfo = ({currentProduct, style}) => {
  const original = style.original_price;
  const sale = style.sale_price;
  return (
    <div id='ProductInfo'>
      <Rating ratings={currentProduct.reviewMetadata.ratings}/>
      <p id='category'>Category: {currentProduct.category}</p>
      <p id='product_name'>Product Name: {style.name} {currentProduct.name}</p>
      <Price prices={{original, sale}}/>
    </div>
  );
};

export default ProductInfo;