import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import { Typography } from '@material-ui/core';
import RPPassProps from './RPPassProps.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';

const RelatedProducts = () => {
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  const [isLoading, setIsLoading] = useState(true);
  const [RPInfo, setRPInfo] = useState([]);
  const [RPStyles, setRPStyles] = useState([]);
  const [RPMetaData, setRPMetaData] = useState([]);
  const currentProductId = useSelector(state => state.currentProductId);

  const getRelatedProductIds = () => {
    axios.get(`${url}/products/${currentProductId}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.data.length; i++) {
          promises.push(
            axios.get(`${url}/products/${result.data[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
              .then((results) => {
                setRPInfo(prev => [...prev, results.data]);
              })
          );
        }
        return Promise.all(promises);
      })
      .then((result) => {
        return axios.get(`${url}/products/${currentProductId}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } });
      })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.data.length; i++) {
          promises.push(
            axios.get(`${url}/products/${result.data[i]}/styles`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
              .then((results) => {
                setRPStyles(prev => [...prev, results.data]);
              })
          );
        }
        return Promise.all(promises);
      })
      .then((result) => {
        return axios.get(`${url}/products/${currentProductId}/related`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } });
      })
      .then((result) => {
        let promises = [];
        for (let i = 0; i < result.data.length; i++) {
          promises.push(
            axios.get(`${url}/reviews/meta?product_id=${result.data[i]}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}` } })
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
    getRelatedProductIds();
  }, []);
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
