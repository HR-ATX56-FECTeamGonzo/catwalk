import React, { useState, useEffect } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Thumbnails from './Thumbnails.js';

const useStyles = makeStyles({
  gallery: {
    backgroundColor: 'rgba(100, 100, 100, .3)',
    border: '1px solid black',
    height: '800px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    zIndex: '30',
    '&:hover': {
      cursor: 'not-allowed'
    }
  },
  button: {
    backgroundColor: 'rgba(100, 100, 100, .3)',
    borderRadius: '50%',
    border: '1px solid rgba(20, 20, 20, .3)',
    margin: '10px'
  }
});

const ImageGallery = ({toggleView, photos, index, clickHandler}) => {
  // state for currently displayed image that's instantiated with index prop
  const [currentIndex, setIndex] = useState(index);
  const styles = useStyles();

  // style hook

  const scrollGallery = (e, idx) => {
    e.stopPropagation();
    setIndex(idx);
    clickHandler(idx);
  };

  // sets currently selected item on style change
  useEffect(() => {
    setIndex(index);
  }, [photos]);



  return (
    <Box className={styles.gallery} onClick={toggleView}>
      {/*  thumbnails */}
      <Box clone order={-1}
        minWidth='105px'
        flexShrink='0'>
        <Thumbnails
          current={currentIndex}
          photos={photos}
          clickHandler={scrollGallery}/>
      </Box>
      {/* left button */}
      <Box className={styles.button} clone
        order={0}
        visibility={currentIndex !== 0 ? 'visible' : 'hidden'}>
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex - 1); }}
          disabled= { currentIndex === 0 }>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* image */}
      <Box component='img'
        height='100%'
        onClick={toggleView}
        src={photos[currentIndex].url} />
      {/* right button */}
      { currentIndex !== photos.length - 1 &&
      <Box className={styles.button} position='absolute' right='0px' >
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex + 1); }}
          disabled={ currentIndex === photos.length - 1 }>
          <ChevronRight/>
        </IconButton>
      </Box>
      }
    </Box>
  );
};

export default ImageGallery;