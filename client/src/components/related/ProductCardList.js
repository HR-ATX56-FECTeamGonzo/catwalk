import React, {component, useState, useEffect, useCallback, useRef} from 'react';
import exampleData from '../../store/exampleData.js';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import {Typography, Paper} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import RelatedProductCard from './RelatedProductCard.js';

const ProductCardList = (props) => {

  //perform 2 get requests

  return (
    <div>
      <RelatedProductCard />
    </div>
  );
};

export default ProductCardList;