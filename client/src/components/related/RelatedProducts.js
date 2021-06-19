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

const RelatedProducts = () => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  const [isLoading, setIsLoading] = useState(true);
  const [RPInfo, setRPInfo] = useState([]);
  const [RPStyles, setRPStyles] = useState([]);
  const [RPMetaData, setRPMetaData] = useState([]);
  const dispatch = useDispatch();

  const currentProductId = useSelector(state => state.currentProductId);
  const relatedProductIds = useSelector(state => state.related);

  const [didChangeIds, setDidChangeIds] = useState(false);
  const priorRPIds = useRef(relatedProductIds);

  const getRelatedProductIds = (ids) => {
    console.log(ids);
    Promise.resolve(ids)
      .then((result) => {
        let promises = [];
        for (let i = 0; i < ids.length; i++) {
          promises.push(
            axios.get(`${url}/products/${ids[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
              .then((results) => {
                // console.log(results.data.map(x => x.data));
                // return results.map(x => x.data);
                setRPInfo(prev => [...prev, results.data]);
              })
          );
        }
        return Promise.resolve(ids);
      })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.length; i++) {
          promises.push(
            axios.get(`${url}/products/${result[i]}/styles`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
              .then((results) => {
                setRPStyles(prev => [...prev, results.data]);
              })
          );
        }
        return Promise.resolve(ids);
      })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.length; i++) {
          promises.push(
            axios.get(`${url}/reviews/meta?product_id=${result[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
              .then((results) => {
                setRPMetaData(prev => [...prev, results.data]);
              })
          );
        }
        return Promise.all(promises);
      })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((err) => console.log('error with getRelatedProductIds'));
  };

  useEffect(() => {
    getRelatedProductIds(relatedProductIds);
  }, []);

  useEffect(() => {
    console.log('trying to update RP Cards!!!');
    // if useRef is NOT equal to relatedProductIds
    let sameRelateds = ((prev, current) => {
      console.log('prev: ' + JSON.stringify(prev));
      console.log('current: ' + JSON.stringify(current));
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

    console.log(sameRelateds ? 'related ids are the same' : 'related ids are different');
    if (!sameRelateds) {
      //treated as synchronous
      ReactDOM.unstable_batchedUpdates(() => {
        setRPInfo([]);
        setRPStyles([]);
        setRPMetaData([]);
      });
      getRelatedProductIds(relatedProductIds);
    }
  }, [relatedProductIds]);

  return (
    <div id='relatedProducts'>
      <Typography variant='subtitle1' align='left'>Related Products</Typography>
      {!isLoading ?
        <RPPassProps RPInfo={RPInfo} RPStyles={RPStyles} RPMetaData={RPMetaData} />
        : <div>Loading . . . </div>
      }
    </div>
  );
};


export default RelatedProducts;
