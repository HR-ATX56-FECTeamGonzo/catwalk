/* eslint-disable indent */
import React, {useState} from 'react';
import exampleData from './exampleData.js';
import ProductInfo from './components/ProductInfo.js';

const Overview = () => {
  // local state needed:
    // view (image gallery)
    // currently selected style
    //
  const [view, setView] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(0);
  return (
  <div id="overview">
    <p>overview</p>
    <ProductInfo currentProduct={exampleData} style={currentStyle}/>
  </div>);
};


export default Overview;

// image gallery
// collapsed (default) view
// thumbnail list
// functionality to switch to expanded view on click
// expanded view
// icons for each image, otherwise functionally the same as thumbnail list
// extra zoom functionality on click


// product info
// avg rating + review count
// doesn't display if no reviews
// category + title
// price
// displays differently for a sale
// product description (this is the slogan + checklist at the bottom)


// style selector/list


// size + quantity + add to bag
// dropdown to select size
// dropdown to select quantity
// add to bag button: saves to cart
