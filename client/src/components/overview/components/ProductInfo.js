import React from 'react';
import Rating from './Rating.js';
import exampleData from '../exampleData.js';

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
      <h3>Product Info</h3>
      <Rating ratings={currentProduct.reviewMetadata.ratings}/>
      <p id='category'>Category: {currentProduct.category}</p>
      <p id='product_name'>Product Name: {currentProduct.name}</p>
      <Price prices={{original, sale}}/>
      <h4 id='slogan'>{currentProduct.slogan}</h4>
      <p id='description'>{currentProduct.description}</p>
    </div>
  );
};

export default ProductInfo;