import React, { useState } from 'react';
import {Box, Grid, Container} from '@material-ui/core';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const ImageGallery = ({photos, index}) => {
  // state for currently displayed image that's instantiated with index prop
  const [currentIndex, setIndex] = useState(index);

  // default view should be 50-60% width of page, or minimum certain amount
  // fixed height of image
  return (
    <Box display='flex' border={1} justifyContent='center' height='500px' width='50%' className='gallery'>
      {/* mess with height/width to get this image to scale correctly with browser size*/}
      <Box component='img' height='auto' width='auto' maxWidth='100%' src={photos[currentIndex].url}/>

    </Box>
  );
};

export default ImageGallery;