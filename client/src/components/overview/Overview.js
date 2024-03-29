import { createSelector } from 'reselect';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Fade, Box, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ProductInfo from './components/ProductInfo.js';
import MoreProductInfo from './components/MoreProductInfo.js';
import StyleList from './components/StyleList.js';
import AddToCart from './components/AddToCart.js';
import ImageGallery from './components/ImageGallery.js';
import { dispatchAllProductData } from '../../redux-helpers/lib/getAllProductData.js';
import axios from 'axios';


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
    maxHeight: '40%'
  }
});

const makePhotoIndexes = createSelector(
  [state => state.styleData.styles],
  styles => styles.map(x => 0)
);

const Overview = () => {
  const [view, setView] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const productID = useSelector((state) => state.currentProductId);
  const classes = LayoutViews({ 'height': view === 0 ? '750px' : '95vh' });
  const dispatch = useDispatch();
  const prevID = useRef(productID);

  // console.log('initial photo indexes: ' + photoIndexes);
  // console.log('initial productID: ' + productID);

  const toggleView = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setView(prevState => {
        return prevState === 0 ? 1 : 0;
      }
      );
    }
  };

  const fetchData = () => {
    const source = axios.CancelToken.source();
    dispatch(dispatchAllProductData(productID, source.token))
      .then((response) => {
        prevID.current = productID;
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (productID !== prevID.current) {
      fetchData();
    }
    return () => {
      console.log('cleanup in overview');
      setIsLoading(true);
    };
  }, [productID]);

  useEffect(() => {
    fetchData();
  }, []);

  return (isLoading ? <p className={classes.root}>loading...</p> :
    <div id="overview" className={classes.root}>
      <Collapse
        in={view !== 0} collapsedHeight='100%'
        classes={{ container: classes.container, hidden: classes.hidden, entered: classes.entered }}>
        <ImageGallery
          view={view}
          toggleView={(e) => { toggleView(e); }}/>
      </Collapse>
      <div className={classes.menu}>
        <ProductInfo />
        <StyleList />
        <AddToCart />
        <MoreProductInfo />
      </div>
    </div>);
};


export default Overview;
