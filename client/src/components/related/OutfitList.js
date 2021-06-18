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
import Grid from '@material-ui/core/Grid';

import { useCookies } from 'react-cookie';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    flexWrap: 'nowrap',
    // justifyContent: 'center',
    overflow: 'hidden',
    // width: '75%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minWidth: '800px',
    maxWidth: '800px'
  },
}));

const OutfitList = (props) => {
  const classes = useStyles();
  const outfitList = useSelector(state => state.outfitList);

  return (
    <div className={classes.root}>
      <Grid container item direction="column">
        <Grid item direction="row">
          <Typography variant='subtitle1' align='center' display='block'>Your Outfit List</Typography>
        </Grid>
        <Grid item direction="row">
          {/* {isLoading ?
          <div>Loading . . . </div> : */}
          <GridList className={classes.gridList} cols={3.5} spacing={5} cellHeight={340}>
            {outfitList.map((each, index) => (
              <GridListTile key={index}>
                <OutfitCard key={index}
                  index={index}
                  outfit={each}
                  cookies={props.cookies}
                />
              </GridListTile>
            ))}
          </GridList >
          {/* } */}
        </Grid>
      </Grid>
    </div>
  );

};

export default OutfitList;