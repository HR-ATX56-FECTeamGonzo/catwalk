import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';


const ImageGallery = ({photos, index, clickHandler}) => {
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
      height: '500px',
      width: '50%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      position: 'absolute'
    }
  })();

  const scrollGallery = (e, dir) => {
    let newIndex = currentIndex + dir;
    setIndex(newIndex);
    clickHandler(newIndex);
  };
  useEffect(() => {
    setIndex(index);
  }, [photos]);

  return (
    <Box className={styles.gallery}>
      {/* left button */}
      <Box className={styles.button} left='0px'>
        <IconButton
          onClick={(e) => { scrollGallery(e, -1); }}
          disabled= { currentIndex === 0 }>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* right button */}
      <Box className={styles.button} right='0px'>
        <IconButton
          onClick={(e) => { scrollGallery(e, 1); }}
          disabled={ currentIndex === photos.length - 1 }>
          <ChevronRight/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageGallery;