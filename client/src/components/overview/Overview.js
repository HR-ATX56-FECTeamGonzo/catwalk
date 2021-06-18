/* eslint-disable indent */
import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Fade, Box, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import exampleData from './exampleData.js';
import ProductInfo from './components/ProductInfo.js';
import StyleList from './components/StyleList.js';
import AddToCart from './components/AddToCart.js';
import ImageGallery from './components/ImageGallery.js';
import {getAllProductData, dispatchAllProductData } from '../../redux-helpers/lib/getAllProductData.js';
import axios from 'axios';

const getDefaultStyle = (arr) => {
  let index = arr.findIndex((style) => style['default?']);
  if (index === -1) {
    index = 0;
  }
  let info = arr[index];
  return {info, index};
};

const setIdtoKey = (sum, val) => {
  sum[val.style_id] = 0;
  return sum;
};

const LayoutViews = makeStyles({
  root: {
    display: 'flex',
    height: props => props.height,
    width: '100%',
    margin: '0px auto'
  },
  container: {
    height: '100%',
    width: '50%',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '& .MuiCollapse-wrapper': {
      height: '100%'
    },
  },
  hidden: {
    width: '50%',
    backgroundColor: 'rgba(124, 124, 124, 1)'
  },
  entered: {
    width: '100%'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '52%',
    margin: 'auto',
    height: '65vh',

  }
});

const Overview = () => {
  const [view, setView] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const productID = useSelector((state) => state.currentProductId);
  //const [productData, setData] = useState({});
  const styles = useSelector((state) => state.test.styles);
  const currentStyle = useSelector((state) => {
    console.log('from currentstyle selector');
    console.log(state.test.styles);
    let arr = state.test.styles;
    return arr[state.currentProductStyleIndex];
  });
  const [photoIndexes, setPhotoIndex] = useState(styles.reduce(setIdtoKey, {}));
  const classes = LayoutViews({ 'height': view === 0 ? '65vh' : '95vh'});
  const dispatch = useDispatch();


  const changePhotoIndex = (index) => {
    setPhotoIndex(prevState => {
      prevState[currentStyle.style_id] = index;
      return prevState;
    });
  };

  const toggleView = (e) => {
    e.stopPropagation();
    console.log('attempting to toggle view');
    if (e.target === e.currentTarget) {
      console.log('toggling view');
      setView(prevState => {
        return prevState === 0 ? 1 : 0;
        }
      );
    }
  };

  useEffect(() => {
    console.log('product was changed to id ' + productID);
    const source = axios.CancelToken.source();
    var test = () => {
      setIsLoading(true);
      dispatch(dispatchAllProductData(productID, source.token));
      setIsLoading(false);
    };
    test();
    return () => {
      console.log('cleanup in overview');
      source.cancel('calling token cancel');
      setIsLoading(false);
    };
  }, [productID]);

  return ( isLoading ? <p className={classes.root}>loading...</p> :
  <div id="overview" className={classes.root}>
      <Collapse
        in={view !== 0} collapsedHeight='100%'
        classes = { {container: classes.container, hidden: classes.hidden, entered: classes.entered } }>
        <ImageGallery
          view={view}
          toggleView={(e) => { toggleView(e); } }
          photos={currentStyle.photos}
          index={photoIndexes[currentStyle.style_id]}
          clickHandler={changePhotoIndex}/>
      </Collapse>
    <div className={classes.menu}>
      <ProductInfo
        currentStyle={currentStyle}/>
      <StyleList/>
      <AddToCart stock={currentStyle.skus}/>
    </div>
  </div>);
};


export default Overview;
