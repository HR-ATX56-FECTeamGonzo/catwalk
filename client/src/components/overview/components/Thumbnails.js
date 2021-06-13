import React, { useState, useEffect } from 'react';
import { Tabs, Tab, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const tabStyles = {
  root: {
    width: '100px',
    height: '100%',
    padding: '0px 2px',
    backgroundColor: 'rgba(0, 0, 0, .25)',
    '& .MuiTabs-indicator': {
      width: '100%',
      backgroundColor: 'transparent',
      border: '5px solid black',
      boxSizing: 'border-box'
    }
  },
  tab: {
    height: '100px',
    padding: '0px',
    margin: '2px',
    display: 'inline-block',
    '& .MuiTab-wrapper img': {
      width: '100px',
      height: 'auto',
      alignSelf: 'flex-start'
    }
  }
};

const TabsWrapper = ({clickHandler, current, photos, classes}) => (
  <Tabs id='thumbnails'
    orientation='vertical'
    value={current}
    className = {classes.root}
    scrollButtons = 'on'
    variant = 'scrollable'
    onChange={(e, val) => { clickHandler(e, val); }}>
    {photos.map((x, idx) => (
      <Tab key={idx}
        className= {classes.tab}
        icon={ <img src={x['thumbnail_url']}/> }
        value={idx} >
      </Tab>
    ))}
  </Tabs>
);

const StyledTabs = withStyles(tabStyles)(TabsWrapper);

export default StyledTabs;

/*
  const tileStyles = {
    root: {
      height: '100px',
      width: '100px',
      margin: '5px'
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


<GridList cols={1} className={className}>
{photos.map((x, idx) => (
  <StyledTile idx={idx} key={idx} src={x['thumbnail_url']} clickHandler={clickHandler}/>
  ))}
  </GridList> */
