import React from 'react';
import { GridList, GridListTile, GridListTileBar, Icon, Typography, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector, useDispatch } from 'react-redux';
import trackClick from '../../util.js';

var useStyles = makeStyles({
  grid: {
    width: '420px',

  },
  icon: {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50%',
    background: 'white',
    margin: '5px'
  },
  thumbnail: {
    height: '100px'
  }
});
const StyleList = () => {
  const classes = useStyles();
  var thumbnailStyle = {
    width: '100px',
    height: '100px'
  };

  const styles = useSelector((state) => state.styleData.styles);
  const current = useSelector((state => state.styleIndex));
  const dispatch = useDispatch();

  const handleClick = (e, idx) => {
    trackClick('Style List', 'Overview');
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
      <GridList className={classes.grid} cols={4} cellHeight={100}>
        {styles.map((x, idx) => (
          <GridListTile
            component='div'
            cols={1}
            style = {thumbnailStyle}
            key={idx}
            onClick={(e) => { handleClick(e, idx); }}>
            <img src={x.photos[0]['thumbnail_url']}/>
            {idx === current &&
            <GridListTileBar
              style={{background: 'none'}}
              title=' '
              titlePosition='top'
              actionIcon={<CheckCircleIcon className={classes.icon}/>}
              actionPosition='right'/>
            }
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default StyleList;

