import React from 'react';
import { Box, Tabs, Tab, IconButton, Fade } from '@material-ui/core';
import { RadioButtonChecked, RadioButtonUnchecked, FiberManualRecordSharp } from '@material-ui/icons';
import { sizing, borders, spacing, flexbox } from '@material-ui/system';

const Indicator = ({clickHandler, current, length, isVisible}) => (
  <Box position='absolute' bottom='5px' left={0} right={0} mx='auto' clone>
    <Fade in={isVisible} timeout={500}>
      <Tabs id='indicator'
        orientation='horizontal'
        value={current}
        centered
        onChange={(e, val) => { clickHandler(e, val); }}>
        {[...Array(length)].map((x, idx) => (
          <Tab key={idx}
            disabled={!isVisible}
            icon={ idx === current ? <FiberManualRecordSharp color='secondary'/> : <FiberManualRecordSharp/> }
            value={idx} >
          </Tab>
        ))}
      </Tabs>
    </Fade>

  </Box>
);

export default Indicator;
