/* eslint-disable indent */
import React, {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, Collapse, Fade } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import exampleData from './exampleData.js';
import ProductInfo from './components/ProductInfo.js';
import StyleList from './components/StyleList.js';
import AddToCart from './components/AddToCart.js';
import ImageGallery from './components/ImageGallery.js';


const getDefaultStyle = (arr) => (
  {
    info: arr.find((style) => style['default?']),
    index: arr.findIndex((style) => style['default?'])
  }
);

const setIdtoKey = (sum, val) => {
  sum[val.style_id] = 0;
  return sum;
};

const LayoutViews = makeStyles({
  root: {
    height: '800px',
    display: 'flex'
  },
  container: {
    height: '100%',
    width: '50%',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  hidden: {
    width: '50%',
    backgroundColor: 'rgba(0, 0, 0, .25)'
  },
  entered: {
    width: '100%'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '50%',
    marginLeft: '10px'
  }
});

const Overview = () => {
  // this eventually gets replaced by store variable
  const styles = exampleData.styles.results;
  const defaultStyle = getDefaultStyle(styles);
  // local state needed:
    // view (image gallery)
    // currently selected style
    // currently selected image per style
  const [view, setView] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);
  const [photoIndexes, setPhotoIndex] = useState(styles.reduce(setIdtoKey, {}));
  const classes = LayoutViews();
  const dispatch = useDispatch();

  const changeStyle = (e, idx) => {
    setCurrentStyle({
      info: styles[idx],
      index: idx
    });
  };

  const changePhotoIndex = (index) => {
    setPhotoIndex(prevState => {
      prevState[currentStyle.info.style_id] = index;
      return prevState;
    });
  };

  const toggleView = (e) => {
    if (e.target === e.currentTarget) {
      (console.log('changing view'));
      setView(prevState => {
        console.log(prevState);
        return prevState === 0 ? 1 : 0;
        }
      );
    }
  };

  useEffect(() => {
    dispatch(
      {
        type: 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX',
        payload: currentStyle.index
      }, [currentStyle]);
  });

  return (
  <div id="overview" className={classes.root}>
      <Collapse
        in={view !== 0} collapsedHeight='100%' timeout='auto'
        classes = { {container: classes.container, hidden: classes.hidden, entered: classes.entered } }>
        <ImageGallery
          toggleView={(e) => { toggleView(e); } }
          photos={currentStyle.info.photos}
          index={photoIndexes[currentStyle.info.style_id]}
          clickHandler={changePhotoIndex}/>
      </Collapse>
    <div className={classes.menu}>
      <ProductInfo
        currentProduct={exampleData}
        currentStyle={currentStyle.info}/>
      <StyleList
        styles={styles}
        current={currentStyle.index}
        clickHandler={changeStyle}/>
      <AddToCart stock={currentStyle.info.skus}/>
    </div>
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
