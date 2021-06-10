import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addOutfit from '../../redux-helpers/related/reduxOutfitList.js';
import OutfitCard from './OutfitCard.js';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'stretch',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minWidth: '700px'
  },
  icon: {
    position: 'absolute',
    top: '0px',
    right: '12px'
  },
  media: {
    top: '1px',
    right: '1px',
    height: 200,
  },
}));

const OutfitList = () => {
  const classes = useStyles();
  const outfitList = useSelector(state => state.outfitList);

  return (
    <div>
      <Typography variant='subtitle1' align='left' display='block'>Your Outfit List</Typography>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3.5} spacing={18} cellHeight={340}>
          {outfitList.map((each, index) => (
            <GridListTile key={index}>
              <OutfitCard key={index}
                outfit={each}
              />
            </GridListTile>
          ))}
        </GridList >
      </div >
    </div>
  );

};

export default OutfitList;