import React, { useState } from 'react';
import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  grid: {
    textAlign: 'left'
  }
});

const MoreProductInfo = () => {
  const {description, slogan, features} = useSelector(state => state.productData
  );
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
      <Typography align='left'variant='h6'>{slogan}</Typography>
      <Typography align='left'>{description}</Typography>
    </Grid>
  );
};

export default MoreProductInfo;