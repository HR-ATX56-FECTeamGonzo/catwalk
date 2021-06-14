import React, { useState, useEffect } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const MainImage = (props) => {

  return (
    <Box component='img'
      maxHeight='100%'
      maxWidth='100%'
      width='auto'
      position='absolute'
      left={0} right={0} mx='auto'
      {...props} />
  );
};

export default MainImage;