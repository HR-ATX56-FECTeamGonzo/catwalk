import React, { useState, useEffect } from 'react';
import { GridList, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';


const tileStyles = {
  root: {
    height: '100px',
    width: '100px'
  },
  tile: {
    height: '100px'
  }
};

const TileWrapper = ({classes, idx, src, clickHandler}) => {
  return (
    <GridListTile
      id={idx}
      key={idx}
      classes={ {root: classes.root, tile: classes.tile}}
      onClick={() => { clickHandler(idx); }}>
      <img src={src}/>
    </GridListTile>);
};

const StyledTile = withStyles(tileStyles)(TileWrapper);

const Thumbnails = ({className, photos, clickHandler}) => (
  <GridList cols={1} className={className}>
    {photos.map((x, idx) => (
      <StyledTile idx={idx} key={idx} src={x['thumbnail_url']} clickHandler={clickHandler}/>
    ))}
  </GridList>
);

export default Thumbnails;