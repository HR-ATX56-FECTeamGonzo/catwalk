import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOutfit, addOutfitReducer } from '../../redux-helpers/related/reduxOutfitList.js';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import exampleData from '../../store/exampleData.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    minHeight: 320,
    maxHeight: 320,
    border: '.5px solid #3d3d5c',
    borderRadius: 0,
  },
  icon: {
    position: 'absolute',
    top: '0px',
    right: '25px'
  },
  media: {
    top: '1px',
    right: '11px',
    height: 190,
    width: 200,
  },
  paper: {
    position: 'absolute',
    width: 500,
    minHeight: 200,
    backgroundColor: 'white',
    border: '0.5px solid #3d3d5c',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  table: {
    maxWidth: 500,
  },
  content: {
    backgroundColor: '#f0f0f5',
    height: 150,
  }
});


const OutfitCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    //need to write
  };

  const handleAdd = () => {
    //need to connect to currentProduct in store
    //and pull in name, category, original_price, sale_price, imageUrl, star rating
    //make an outfitObj to pass in to addOutfit()
    dispatch(addOutfit(exampleData));
  };

  return (
    <Card className={classes.root}>
      <CardMedia onClick={handleAdd} className={classes.media}>
        <img src={props.outfit.imageUrl} alt={props.outfit.name} className={classes.media} />
        <IconButton onClick={handleDelete} className={classes.icon}>
          <HighlightOffIcon />
        </IconButton>
      </CardMedia>

      <CardContent className={classes.content}>
        <Typography variant='caption' alight='left'>{props.outfit.category}</Typography> <br />
        <Typography variant='subtitle2' alight='left'>{props.outfit.name}</Typography>
        <Typography variant='caption' alight='left'>${props.outfit.salePrice ? props.outfit.salePrice : props.outfit.originalPrice}</Typography><br />

      </CardContent>
    </Card>
  );
};

export default OutfitCard;