import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, IconButton, Modal, Fade } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const modalStyle = makeStyles({
  view: {
    width: '100vw',
    height: '100vh'
  },
  image: props => ({
    width: props.width * 2.5,
    height: props.height * 2.5,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: `translate(${props.xOffset - 50}%, ${props.yOffset - 50}%)`
  })
});


//helper functions for calculating offset percents
const getOffset = (imgSize, windowSize, cursorPosition) => {
  imgSize *= 2.5;
  if (imgSize < windowSize) {
    return 0;
  }
  return ( 100 * ((( imgSize - windowSize ) / 2 ) * ( 1 - (cursorPosition / (windowSize / 2 )))) / imgSize );

};

const getOffsets = (width, height, windowSize, cursorPosition) => {
  return {
    xOffset: getOffset(width, windowSize.x, cursorPosition.x).toFixed(2),
    yOffset: getOffset(height, windowSize.y, cursorPosition.y).toFixed(2)
  };
};

const ZoomedImage = React.forwardRef((props, ref) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0});
  const [windowSize, setWindowSize] = useState({x: window.innerWidth, y: window.innerHeight});
  // image width
  const {width, height} = props.dimensions;
  const {xOffset, yOffset} = getOffsets(width, height, windowSize, cursorPosition);
  const classes = modalStyle({width, height, xOffset, yOffset});

  const getCoords = (e) => {
    setCursorPosition({x: e.clientX, y: e.clientY });
  };

  // update window size on resize while expanded zoom view is active
  useEffect(() => {
    const getNewWindowSize = () => {
      setWindowSize({x: window.innerWidth, y: window.innerHeight});
    };
    window.addEventListener('resize', getNewWindowSize);

    return () => {
      window.removeEventListener('resize', getNewWindowSize);
    };
  }, [props.open]);

  return (
    <Modal open={props.open} onClick={props.onClose} ref={ref}>
      <Fade in={props.open} timeout={500}>
        <Box className={classes.view} onMouseMove={(e) => { getCoords(e); }}>
          <Box className={classes.image} component='img' src={props.src}/>
        </Box>
      </Fade>
    </Modal>
  );
});

export default ZoomedImage;