import React, {useState, useEffect, useRef} from 'react';
import { Typograhpy, Box } from '@material-ui/core';
import { display } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const MoreProductInfo = () => {
  const description = useSelector(state => state.test.description);
  const slogan = useSelector(state => state.test.slogan);


};