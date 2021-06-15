import Thumbnails from './Thumbnails.js';
import MainImage from './MainImage.js';
import Indicator from './Indicator.js';
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  gallery: {
    backgroundColor: props => props.bgColor,
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    zIndex: '30',
    '&:hover': {
      cursor: 'not-allowed'
    },
    transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  button: {
    backgroundColor: 'rgba(100, 100, 100, .3)',
    borderRadius: '50%',
    border: '1px solid rgba(20, 20, 20, .3)',
    margin: '10px',
    position: 'absolute',
    transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

const ImageGallery = ({view, toggleView, photos, index = 0, clickHandler}) => {
  // state for currently displayed image that's instantiated with index prop
  const [currentIndex, setIndex] = useState(index);
  const currentView = view;
  const bgColor = view === 0 ? 'rgba(100, 100, 100, .3)' : 'rgba(100, 100, 100, 1)';
  const styles = useStyles({bgColor});
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
      <MainImage src={photos[currentIndex].url} toggleView={toggleView}/>
      {/*  thumbnails */}
      <Thumbnails
        isVisible={view === 0}
        current={currentIndex}
        photos={photos}
        clickHandler={scrollGallery}/>
      {/* left button */}
      <Box className={styles.button}
        visibility={currentIndex !== 0 ? 'visible' : 'hidden'}
        left={view === 0 ? 110 : 0} clone>
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex - 1); }}
          disabled= { currentIndex === 0 }>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* image */}
      {/* right button */}
      <Box className={styles.button}
        visibility={currentIndex !== photos.legnth - 1 ? 'visible' : 'hidden'}
        right='0' clone>
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex + 1); }}
          disabled={ currentIndex === photos.length - 1 }>
          <ChevronRight/>
        </IconButton>
      </Box>
      <Indicator
        isVisible={view !== 0}
        current={currentIndex || 0}
        length={photos.length}
        clickHandler={scrollGallery}/>
    </Box>
  );
};

export default ImageGallery;