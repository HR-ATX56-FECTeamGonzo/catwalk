import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';

const StyleList = ({styles, current}) => {

  return (
    <div>
      <h4>Style List</h4>
      <span>Style: </span>
      <span>{styles[current].name}</span>
      <GridList className='styleGrid' cols={4}>
        {styles.map((x, idx) => (
          <GridListTile item>
            <img src={x.photos[0]['thumbnail_url']}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default StyleList;


/* <div id='styleList'>
{styles.map((x, idx) => (
  <div key={idx}>
  <img src={x.photos[0]['thumbnail_url']}/>
  </div>
  ))}
</div> */