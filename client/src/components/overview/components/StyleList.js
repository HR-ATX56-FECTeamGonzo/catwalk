import React from 'react';
import { GridList, GridListTile, GridListTileBar, Icon, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';

const StyleList = () => {
  var thumbnailStyle = {
    width: '100px',
    height: '100px'
  };

  var iconStyle = {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50%',
    background: 'white',
    margin: '5px'
  };

  const styles = useSelector((state) => state.test.styles);
  const current = useSelector((state => state.currentProductStyleIndex));
  const dispatch = useDispatch();

  const handleClick = (e, idx) => {
    e.stopPropagation();
    dispatch({
      type: 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX',
      payload: idx
    });
  };


  return (
    <div id='styleList'>
      <Typography display='inline' style={{lineHeight: '3em', fontWeight: 500}}>
        Style&nbsp;&gt;&nbsp;
      </Typography>
      <Typography display='inline'>
        {styles[current].name}
      </Typography>
      {/*refactor tilebar ==> badge */}
      <GridList className='styleGrid' cols={4} style={{width: '420px'}}>
        {styles.map((x, idx) => (
          <GridListTile
            cols={1}
            style={thumbnailStyle}
            key={idx}
            onClick={(e) => { handleClick(e, idx); }}>
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

