import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, IconButton, Modal, Fade } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const modalStyle = makeStyles({
  view: {
    width: '100vw',
    height: '100vh',
    display: 'flex'
  },
  image: props => {
    console.log('style props: ' + JSON.stringify(props));
    return ({
      width: props.width * 2.5,
      height: props.height * 2.5,
      margin: 'auto'
    });
  }
});

const ZoomedImage = React.forwardRef((props, ref) => {
  console.log(props.dimensions.width + 'x' + props.dimensions.height);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0});
  const {width, height} = props.dimensions;
  const classes = modalStyle({width, height});
  useEffect(() => {

  }, [props]);

  return (
    <Modal open={props.open} onClick={props.onClose} ref={ref}>
      <Fade in={props.open} timeout={500}>
        <Box className={classes.view}>
          <Box className={classes.image} component='img' src={props.src}/>
        </Box>
      </Fade>
    </Modal>
  );
});

export default ZoomedImage;