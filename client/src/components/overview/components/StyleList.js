import React from 'react';
import { GridList, GridListTile, GridListTileBar, Icon } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const StyleList = ({styles, current, clickHandler}) => {
  var iconStyle = {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50%',
    background: 'white',
    margin: '5px'
  };
  return (
    <div id='styleList'>
      <h4>Style List</h4>
      <span>Style &gt; </span>
      <span>{styles[current].name}</span>
      <GridList className='styleGrid' cols={4}>
        {styles.map((x, idx) => (
          <GridListTile
            cols={1}
            key={idx}
            onClick={(e) => { clickHandler(e, idx); }}>
            <img src={x.photos[0]['thumbnail_url']}/>
            {idx === current &&
            <GridListTileBar
              style={{background: 'none'}}
              title=' '
              titlePosition='top'
              actionIcon={<CheckCircleIcon style={iconStyle}/>}
              actionPosition='right'/>
            }
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