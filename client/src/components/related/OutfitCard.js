import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import funcs from '../../redux-helpers/related/reduxOutfitList.js';

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
    right: '8px'
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

  const handleDelete = (index) => {
    dispatch(funcs.deleteOutfit(index));
  };

  const handleAdd = () => {
    //need to connect to currentProduct in store
    //and pull in name, category, original_price, sale_price, imageUrl, star rating
    //make an outfitObj to pass in to addOutfit()
    dispatch(funcs.addOutfit(obj));
  };

  return (
    <Card className={classes.root} >
      {props.outfit.name !== 'Add to Outfit' ?
        // replace later with props.outfit.id
        <IconButton onClick={() => handleDelete(exampleData.id)} className={classes.icon}>
          <HighlightOffIcon />
        </IconButton>
        : null}

      <CardMedia onClick={() => handleAdd()} className={classes.media}>
        <img src={props.outfit.imageUrl} alt={props.outfit.name} className={classes.media} />
      </CardMedia>

      <CardContent className={classes.content}>
        <Typography variant='caption' align='left'>{props.outfit.category}</Typography> <br />
        <Typography
          variant={props.outfit.name === 'Add to Outfit' ? 'h5' : 'subtitle2'}
          align={props.outfit.name === 'Add to Outfit' ? 'center' : 'left'}
        >
          {props.outfit.name}
        </Typography>
        <Typography variant='caption' align='left'>
          <span style={props.outfit.salePrice ? { 'textDecoration': 'line-through' } : null}>
            {props.outfit.originalPrice}
          </span>
          <span style={{ color: 'red' }}>
            {props.outfit.salePrice ? '$' + props.outfit.salePrice : null}
          </span>
        </Typography><br />

      </CardContent>
    </Card >
  );
};

export default OutfitCard;