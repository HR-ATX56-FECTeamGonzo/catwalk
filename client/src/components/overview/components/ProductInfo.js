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
const Price = ({prices}) => (
  <div id='price'>
    <span style={prices.sale ? { 'textDecoration': 'line-through' } : null }>
      ${prices.original}
    </span> &nbsp;
    {prices.sale && <span style={{ color: 'red' }}>${prices.sale}</span>}
  </div>
);


const ProductInfo = ({currentProduct, currentStyle}) => {
  const original = currentStyle.original_price;
  const sale = currentStyle.sale_price;
  return (
    <div id='ProductInfo'>
      <Rating ratings={currentProduct.reviewMetadata.ratings}/>
      <p id='category'>Category: {currentProduct.category}</p>
      <p id='product_name'>Product Name: {currentStyle.name} {currentProduct.name}</p>
      <Price prices={{original, sale}}/>
      <h3 id='slogan'>{currentProduct.slogan}</h3>
      <p id='description'>{currentProduct.description}</p>
    </div>
  );
};

export default ProductInfo;