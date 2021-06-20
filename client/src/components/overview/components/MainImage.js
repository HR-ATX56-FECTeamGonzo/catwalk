import ZoomedImage from './ZoomedImage.js';
import React, { useState, useEffect, useRef } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const imageViews = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: props => props.view === 0 ? 'relative' : 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
      width: 'auto',
      left: '0px',
      right: '0px',
      margin: '0px auto'
    }
  }
});

const MainImage = ({view, src, clickHandler}) => {
  const [zoomed, setZoom] = useState(false);
  const classes = imageViews({view});
  const imgRef = useRef(<img src={src}/>);
  const handleClick = (e) => {
    if (view === 0) {
      clickHandler(e);
      return;
    }
    setZoom(prevState => !prevState);
  };

  const onError = (e) => {
    console.log('running onError');
    e.target.src = './noImage.png';
  };

  return (
    <Box className={classes.root}
      onClick={(e) => { clickHandler(e); }} >
      <Box ref={imgRef} component='img' src={src} onClick={handleClick} onError={(e) => { onError(e); }}/>
      <ZoomedImage
        src={src}
        dimensions={imgRef.current}
        open={zoomed}
        onClose={() => { setZoom(false); }}/>
    </Box>
  );
};

export default MainImage;
