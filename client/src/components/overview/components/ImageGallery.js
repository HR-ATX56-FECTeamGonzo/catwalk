import React, { useState, useEffect } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Thumbnails from './Thumbnails.js';


const ImageGallery = ({toggleView, photos, index, clickHandler}) => {
  // state for currently displayed image that's instantiated with index prop
  const [currentIndex, setIndex] = useState(index);
  // style hook
  const styles = makeStyles({
    gallery: {
      backgroundImage: `url(${photos[currentIndex].url})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      border: '1px solid black',
      height: '750px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      cursor: 'help',
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
  })();

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
      <Thumbnails
        current={currentIndex}
        photos={photos}
        clickHandler={scrollGallery}/>
      {/* left button */}
      <Box className={styles.button}>
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex - 1); }}
          disabled= { currentIndex === 0 }>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* right button */}
      <Box className={styles.button} position='absolute' right='0px' >
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex + 1); }}
          disabled={ currentIndex === photos.length - 1 }>
          <ChevronRight/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageGallery;