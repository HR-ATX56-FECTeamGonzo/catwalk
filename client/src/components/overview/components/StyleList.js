import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';

const StyleList = ({styles, current, clickHandler}) => {

  return (
    <div>
      <h4>Style List</h4>
      <span>Style: </span>
      <span>{styles[current].name}</span>
      <GridList className='styleGrid' cols={4}>
        {styles.map((x, idx) => (
          <GridListTile
            cols={1}
            key={idx}
            onClick={(e) => { clickHandler(e, idx); }}>
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