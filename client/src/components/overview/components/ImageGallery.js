import React, { useState, useEffect } from 'react';
import { Box, GridList, GridListTile, IconButton } from '@material-ui/core';
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
      height: '750px',
      width: '50%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      position: 'relative'
    },
    overlay: {
      width: '100px',
      padding: '5px'
    },
    thumbnail: {
      width: '100%',
      height: '100px'
    }
  })();

  const scrollGallery = (e, idx) => {
    setIndex(idx);
    clickHandler(idx);
  };

  // sets currently selected item on style change
  useEffect(() => {
    setIndex(index);
  }, [photos]);

  return (
    <Box className={styles.gallery}>
      {/*  thumbnails */}
      <GridList cols={1} className={styles.overlay}>
        {photos.map((x, idx) => (
          <GridListTile key={idx} cols={1} style={{
            width: '100px',
            height: '100px'
          }}
          onClick={(e) => { scrollGallery(e, idx); }}>
            <img src={x['thumbnail_url']}/>
          </GridListTile>
        ))}
      </GridList>
      {/* left button */}
      <Box className={styles.button}>
        <IconButton
          onClick={(e) => { scrollGallery(e, currentIndex - 1); }}
          disabled= { currentIndex === 0 }>
          <ChevronLeft/>
        </IconButton>
      </Box>
      {/* right button */}
      <Box position='absolute' right='0px'>
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