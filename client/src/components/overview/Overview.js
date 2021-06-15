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
import getAllProductData from '../../redux-helpers/lib/getAllProductData.js';
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
    height: props => props.height
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
    left: '50%',
    marginLeft: '10px'
  }
});

const Overview = () => {
  const productID = useSelector((state) => state.currentProductId);
  const [view, setView] = useState(0);
  const [productData, setData] = useState({});
  const [productInfo, setInfo] = useState(exampleData);
  const [isLoading, setIsLoading] = useState(false);
  // this eventually gets replaced by store variable
  const [styles, setStyles] = useState(exampleData.styles.results);
  const [currentStyle, setCurrentStyle] = useState(getDefaultStyle(exampleData.styles.results));
  const [photoIndexes, setPhotoIndex] = useState(styles.reduce(setIdtoKey, {}));
  const classes = LayoutViews({ 'height': view === 0 ? '65vh' : '95vh'});
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
      setView(prevState => {
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

  useEffect(() => {
    console.log('product was changed to id ' + productID);
    const source = axios.CancelToken.source();
    var test = () => {
      debugger;
      setIsLoading(true);
      getAllProductData(productID, source.token)
      .then((data) => {
        console.log('data succesfully fetched');
        ReactDOM.unstable_batchedUpdates(() => {
          var productInfo = {
            ratings: data[0].ratings,
            name: data[1].name,
            category: data[1].category,
            slogan: data[1].slogan,
            description: data[1].description
          };
          setData(data);
          setInfo(productInfo);
          let styles = data[2].results;
          setStyles(styles);
          setCurrentStyle(getDefaultStyle(styles));
          setPhotoIndex(styles.reduce(setIdtoKey, {}));
        });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('error setting overview state' + e);
      });
    };
    test();
    return () => {
      console.log('cleanup');
      source.cancel('calling token cancel');
    };
  }, [productID]);

  return ( isLoading ? <p>loading...</p> :
  <div id="overview" className={classes.root}>
      <Collapse
        in={view !== 0} collapsedHeight='100%'
        classes = { {container: classes.container, hidden: classes.hidden, entered: classes.entered } }>
        <ImageGallery
          view={view}
          toggleView={(e) => { toggleView(e); } }
          photos={currentStyle.info.photos}
          index={photoIndexes[currentStyle.info.style_id]}
          clickHandler={changePhotoIndex}/>
      </Collapse>
    <div className={classes.menu}>
      <ProductInfo
        currentProduct={productInfo}
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
