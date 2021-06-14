import React, { useState, useEffect } from 'react';
import { Tabs, Tab, GridListTile, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const tabStyles = {
  root: {
    minWidth: '100px',
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
    display: 'flex',
    '& .MuiTab-wrapper': {
      width: 'auto',
      minHeight: '100px',
      justifyContent: 'flex-start',
      '& img': {
        width: '150px'
      }
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
