import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import { Typography } from '@material-ui/core';
import RPPassProps from './RPPassProps.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRelated } from '../../redux-helpers/currentProduct.actions.js';
import { getAllProductData } from '../../redux-helpers/lib/getAllProductData.js';

const RelatedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const dispatch = useDispatch();
  const relatedProductIds = useSelector(state => state.related);
  const priorRPIds = useRef(relatedProductIds);

  const getRelatedProductsData = (ids) => {
    let promises = ids.map(x => getAllProductData(x));
    return Promise.all(promises)
      .then(data => {
        setRelatedProductData(data);
      })
      .then(() => {
        priorRPIds.current = ids;
        setIsLoading(false);
      })
      .catch((err) => console.log('error fetching data for related products - ' + err.message));
  };


  useEffect(() => {
    console.log('initial related products render');
    getRelatedProductsData(relatedProductIds);
  }, []);

  useEffect(() => {
    // if useRef is NOT equal to relatedProductIds
    let sameRelateds = ((prev, current) => {
      // console.log('prev: ' + JSON.stringify(prev));
      // console.log('current: ' + JSON.stringify(current));
      if (prev.length === current.length) {
        for (var x = 0; x < prev.length; x++) {
          if (prev[x] !== current[x]) {
            return false;
          }
        }
        return true;
      }
      return false;
    })(priorRPIds.current, relatedProductIds);

    if (!sameRelateds) {
      setIsLoading(true);
      getRelatedProductsData(relatedProductIds);
    }
  }, [relatedProductIds]);

  return (
    <div id='relatedProducts'>
      <Typography variant='subtitle1' align='left'>Related Products</Typography>
      {!isLoading ?
        <RPPassProps data={relatedProductData} test={(e) => { setIsLoading(false); }}/>
        : <div>Loading . . . </div>
      }
    </div>
  );
};


export default RelatedProducts;
