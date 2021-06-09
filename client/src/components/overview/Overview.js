/* eslint-disable indent */
import React, {useState} from 'react';
import exampleData from './exampleData.js';
import ProductInfo from './components/ProductInfo.js';
import StyleList from './components/StyleList.js';
import AddToCart from './components/AddToCart.js';


const getDefaultStyle = (arr) => (
  arr.find((style) => style['default?'])
);

const getDefaultStyleIndex = (arr) => (
  arr.findIndex((style) => style['default?'])
);

const Overview = () => {
  // this eventually gets replaced by store variable
  const styles = exampleData.styles.results;
  const defaultStyle = {
    info: getDefaultStyle(styles),
    index: getDefaultStyleIndex(styles)
  };
  // local state needed:
    // view (image gallery)
    // currently selected style
    //
  const [view, setView] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);

  const handleClick = (e, idx) => {
    setCurrentStyle({
      info: styles[idx],
      index: idx
    });
  };

  return (
  <div id="overview">
    <h2>overview</h2>
    <ImageGallery />
    <ProductInfo
      currentProduct={exampleData}
      currentStyle={currentStyle.info}/>
    <StyleList
      styles={styles}
      current={currentStyle.index}
      clickHandler={handleClick}/>
    <AddToCart stock={currentStyle.info.skus}/>
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
