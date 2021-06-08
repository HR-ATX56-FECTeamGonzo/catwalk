/* eslint-disable indent */
import React, {useState} from 'react';
import exampleData from './exampleData.js';
import ProductInfo from './components/ProductInfo.js';
import StyleList from './components/StyleList.js';
const Overview = () => {
  // local state needed:
    // view (image gallery)
    // currently selected style
    //
  const getDefaultStyle = (styles) => (
    styles.find((style) => style['default?'])
  );

  const defaultStyle = getDefaultStyle(exampleData.styles.results);

  const [view, setView] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);
  return (
  <div id="overview">
    <h2>overview</h2>
    <ProductInfo currentProduct={exampleData} currentStyle={currentStyle}/>
    <StyleList styles={exampleData.styles.results} current={currentStyle}/>
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
