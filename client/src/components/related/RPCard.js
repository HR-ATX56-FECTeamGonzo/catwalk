import React from 'react';
import {Typography, Paper} from '@material-ui/core';

//need to finish passing props
//need to do CSS
//need to add star icon and modal comparison
const RPCard = (props) => {
  return (
    <Paper
      className="Project"
      style={{
        backgroundColor: 'white',
        width: 150,
        height: 300
      }}
      elevation={10}
    >

      {/* {relatedProductStyles[1] ? <img width="150" src={relatedProductStyles[1].results[0].photos[0].thumbnail_url}></img> : null} */}

      <Typography variant='caption' alight='left'>{props.name}</Typography> <br />
      <Typography variant='subtitle2' alight='left'>name: </Typography> <br />
      <Typography variant='caption' alight='left'></Typography>

    </Paper>
  );
};

export default RPCard;