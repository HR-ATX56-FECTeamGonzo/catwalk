import React, { useState } from 'react';
import { Box, Grid, Container, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';


const ImageGallery = ({photos, index}) => {
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
  // default view should be 50-60% width of page, or minimum certain amount
  // fixed height of image
  return (
    <Box className={styles.gallery}>
      {/* left button */}
      <Box className={styles.button} left='0px'>
        <IconButton>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* right button */}
      <Box className={styles.button} right='0px'>
        <IconButton>
          <ChevronRight/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageGallery;