import React from 'react';
import { Tabs, Tab, IconButton, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const tabStyles = {
  root: {
    minWidth: '60px',
    maxWidth: '110px',
    width: '110px',
    height: '100%',
    alignItems: 'center',
    padding: '0px 2px',
    zIndex: 30,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    '& .MuiTabs-indicator': {
      width: '100%',
      backgroundColor: 'transparent',
      border: '5px solid black',
      boxSizing: 'border-box'
    },
    '& .MuiTabs-scroller': {
      width: '100%'
    }
  },
  tab: {
    height: '100px',
    padding: '0px',
    minWidth: '100px',
    margin: '2px 0px',
    '& .MuiTab-wrapper': {
      overflowX: 'hidden',
      width: 'auto',
      minHeight: '100px',
      justifyContent: 'flex-start',
      '& img': {
        width: '150px'
      }
    }
  }
};

const onError = (e) => {
  console.log('running onError');
  e.target.src = './noImage.png';
};

const TabsWrapper = ({clickHandler, current, photos, classes, isVisible}) => (
  <Fade in={isVisible} >
    <Tabs id='thumbnails'
      orientation='vertical'
      value={current}
      className = {classes.root}
      scrollButtons = 'on'
      variant = 'scrollable'
      onChange={(e, val) => { clickHandler(e, val); }}>
      {photos.map((x, idx) => {
        return (
          <Tab key={idx}
            disabled={!isVisible}
            className= {classes.tab}
            icon={ <img src={x.thumbnail_url} onError={(e) => { onError(e, x); }}/> }
            value={idx} >
          </Tab>
        );
      })}
    </Tabs>
  </Fade>
);

const StyledTabs = withStyles(tabStyles)(TabsWrapper);

export default StyledTabs;
