import React, {component, useState, useEffect, useCallback, useRef} from 'react';
import exampleData from '../../store/exampleData.js';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import {Typography, Paper} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import RelatedProductCard from './RelatedProductCard.js';
// import {getRelatedProducts} from '../../redux-helpers/related/reduxRelatedProducts.js';
// import { useDispatch, useSelector } from 'react-redux';

// const useStateWithPromise = (initialState) => {
//   const [state, setState] = useState(initialState);
//   const resolverRef = useRef(null);

//   useEffect(() => {
//     if (resolverRef.current) {
//       resolverRef.current(state);
//       resolverRef.current = null;
//     }
//     /**
//      * Since a state update could be triggered with the exact same state again,
//      * it's not enough to specify state as the only dependency of this useEffect.
//      * That's why resolverRef.current is also a dependency, because it will guarantee,
//      * that handleSetState was called in previous render
//      */
//   }, [resolverRef.current, state]);

//   const handleSetState = useCallback((stateAction) => {
//     setState(stateAction);
//     return new Promise(resolve => {
//       resolverRef.current = resolve;
//     });
//   }, [setState]);

//   return [state, handleSetState];
// };

const RelatedProducts = () => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products';
  const [relatedProductIds, setRelatedProductIds] = useState([]);

  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [relatedProductStyles, setRelatedProductStyles] = useState([]);

  const getRelatedProductInfo = () => {
    axios.get(`${url}/${exampleData.id}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
      .then((result) => {
        console.log(result.data); //[id, id, id]
        let promises = [];
        for (let i = 0; i < result.data.length; i++) {
          promises.push(axios.get(`${url}/${result.data[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}}))
        }
        return Promise.all(promises);
      })
      .then((result) => {
        result.forEach(item => setRelatedProductInfo(prev => prev.concat(item.data)));
      })
      .then((result) => {
        return axios.get(`${url}/${exampleData.id}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}});
      })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.data.length; i++) {
          promises.push(axios.get(`${url}/${result.data[i]}/styles`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}}))
        }
        return Promise.all(promises);
      })
      .then((result) => {
        result.forEach(item => setRelatedProductStyles(prev => prev.concat(item.data)));
      })
      .catch((err) => console.log('there has been an error with getRelatedProductIds'));
  };

  useEffect(() => {
    getRelatedProductInfo();
  }, []); //subscription

  return (
    <div id='relatedProductCarousel'>
      <Typography variant='subtitle1' align='left'>Related Products</Typography>
      <Carousel
        autoPlay='false'
        animation='fade'
        indicators='true'
        navButtonsAlwaysVisible='true'
      >
        <Paper
          className="Project"
          style={{
            backgroundColor: 'white',
            width: 150,
            height: 300
          }}
          elevation={10}
        >

          {relatedProductStyles[1] ? <img width="150" src={relatedProductStyles[1].results[0].photos[0].thumbnail_url}></img> : null}

          <Typography variant='caption' alight='left'>Category: </Typography> <br />
          <Typography variant='subtitle2' alight='left'>{relatedProductInfo.name}: </Typography> <br />
          <Typography variant='caption' alight='left'></Typography>

        </Paper>
        {/* {
          relatedProductInfo.map((item, index) => {
            <RelatedProductCard item={item} key={index} />;
          })
        } */}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;