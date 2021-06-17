import React from 'react';
import Rating from './Rating.js';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  root: {
    background: 'rgba(0,0,0,.4)'
  },
  category: {
    fontsize: '1.5em',
    lineHeight: '1.6'
  },
  name: {
    fontWeight: '600',
    fontSize: '4em',
    lineHeight: '1.0'
  },
  sale: {

  }
});
const Price = ({prices, className}) => {
  return (
    <div id='price'className={className}>
      <Typography>
        ${prices.original}
      </Typography>
      <span style={prices.sale ? { 'textDecoration': 'line-through' } : null }>
        ${prices.original}
      </span> &nbsp;
      {prices.sale && <span style={{ color: 'red' }}>${prices.sale}</span>}
    </div>
  );

};

const ProductInfo = ({currentProduct, currentStyle}) => {
  const original = currentStyle.original_price;
  const sale = currentStyle.sale_price;
  const classes = styles();
  return (
    <div id='ProductInfo' className={classes.root}>
      <Rating ratings={currentProduct.ratings}/>
      <Typography className={classes.category}>{currentProduct.category}</Typography>
      <Typography className={classes.name}>{currentProduct.name}</Typography>
      <Price prices={{original, sale}} className={classes.sale}/>
      {/*  <h4 id='slogan'>{currentProduct.slogan}</h4>
      <p id='description'>{currentProduct.description}</p> */}
    </div>
  );
};

export default ProductInfo;