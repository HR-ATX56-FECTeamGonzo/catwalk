import React, { useState, useEffect } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const imageViews = makeStyles({

});

const MainImage = ({src, toggleView}) => {
  const [zoomed, setZoom] = useState(false);

  const handleClick = () => {
    setZoom(prevState => !prevState);
  };
  return (
    <Box maxHeight='100%'
      maxWidth='100%'
      width='auto'
      position='absolute'
      left={0} right={0} mx='auto'
      display='flex'
      onClick={(e) => { toggleView(e); }}>
      <Box />
    </Box>
  );
};

export default MainImage;
